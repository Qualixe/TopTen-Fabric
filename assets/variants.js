/**
 * Product Variants - Enhanced for Multiple Options
 * Handles dynamic availability based on selected options
 */

document.addEventListener('DOMContentLoaded', function () {

    // Get product data
    const variants = window.productData ? window.productData.variants : [];
    const options = window.productData ? window.productData.options : [];

    if (variants.length === 0) {
        initBasicFunctionality();
        return;
    }

    initBasicFunctionality();
    initVariantFunctionality();

    function initBasicFunctionality() {
        // Basic functionality like quantity controls can be added here
    }

    function initVariantFunctionality() {
        // Variant selection
        const variantOptions = document.querySelectorAll('.variant-option');

        if (variantOptions.length === 0) {
            return;
        }

        variantOptions.forEach(function (option) {
            option.addEventListener('change', function () {
                updateVariantAvailability();
                updateVariant();
            });

            // Prevent disabled variants from being selected
            option.addEventListener('click', function (e) {
                if (this.disabled || this.closest('.product-varient-input-field').classList.contains('disabled')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        });

        // Prevent clicking on disabled variant labels
        const variantLabels = document.querySelectorAll('.product-varient-label');
        variantLabels.forEach(function (label) {
            label.addEventListener('click', function (e) {
                if (this.closest('.product-varient-input-field').classList.contains('disabled')) {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }
            });
        });

        // Initialize immediately for single-option products
        initializeVariantStates();

        // Initialize on page load with a small delay for multi-option products
        setTimeout(function () {
            updateVariantAvailability();
            updateVariant();
        }, 100);
    }

    function initializeVariantStates() {
        // Set initial disabled states based on server-side rendering
        const variantOptions = document.querySelectorAll('.variant-option');

        variantOptions.forEach(function (option) {
            const inputField = option.closest('.product-varient-input-field');

            if (inputField && inputField.classList.contains('disabled')) {
                option.disabled = true;
            }
        });
    }

    function updateVariantAvailability() {
        const variantOptions = document.querySelectorAll('.variant-option');

        // Get currently selected options
        const selectedOptions = {};

        variantOptions.forEach(function (option) {
            if (option.checked) {
                const optionName = option.name.replace('options[', '').replace(']', '');
                selectedOptions[optionName] = option.value;
            }
        });

        // Group options by their option name for easier processing
        const optionGroups = {};
        variantOptions.forEach(function (option) {
            const optionName = option.name.replace('options[', '').replace(']', '');
            if (!optionGroups[optionName]) {
                optionGroups[optionName] = [];
            }
            optionGroups[optionName].push(option);
        });

        // Update availability for each option
        Object.keys(optionGroups).forEach(function (optionName) {
            const optionsInGroup = optionGroups[optionName];

            optionsInGroup.forEach(function (option) {
                const optionValue = option.value;
                const inputField = option.closest('.product-varient-input-field');

                if (!inputField) {
                    return;
                }

                // Create a test selection: keep all OTHER selected options, test this option value
                const testSelection = {};

                // Copy all currently selected options EXCEPT for the current option group
                Object.keys(selectedOptions).forEach(function (selectedOptionName) {
                    if (selectedOptionName !== optionName) {
                        testSelection[selectedOptionName] = selectedOptions[selectedOptionName];
                    }
                });

                // Add the test value for the current option
                testSelection[optionName] = optionValue;

                // Check if any variant matches this exact combination and is available
                let isAvailable = false;

                for (let variant of variants) {
                    let matches = true;

                    // Check if variant matches ALL options in the test selection
                    for (let [testOptionName, testValue] of Object.entries(testSelection)) {
                        if (testValue) {
                            // Find which option position this is
                            let optionPosition = null;
                            if (options && options.length > 0) {
                                const optionIndex = options.findIndex(opt => opt.name === testOptionName);
                                if (optionIndex !== -1) {
                                    optionPosition = optionIndex + 1;
                                }
                            } else {
                                // Fallback: try to determine position from data attributes
                                const optionElement = document.querySelector(`input[name="options[${testOptionName}]"]`);
                                if (optionElement && optionElement.dataset.optionPosition) {
                                    optionPosition = parseInt(optionElement.dataset.optionPosition);
                                }
                            }

                            if (optionPosition) {
                                const variantOptionKey = `option${optionPosition}`;
                                if (variant[variantOptionKey] !== testValue) {
                                    matches = false;
                                    break;
                                }
                            }
                        }
                    }

                    if (matches && variant.available) {
                        isAvailable = true;
                        break;
                    }
                }

                // Update the UI based on availability
                if (isAvailable) {
                    inputField.classList.remove('disabled');
                    option.disabled = false;
                } else {
                    inputField.classList.add('disabled');
                    option.disabled = true;
                }
            });
        });
    }

    function updateVariant() {
        const variantOptions = document.querySelectorAll('.variant-option');

        // Get selected options using the name attribute format
        const selectedOptions = {};

        variantOptions.forEach(function (option) {
            if (option.checked) {
                const optionName = option.name.replace('options[', '').replace(']', '');
                selectedOptions[optionName] = option.value;
            }
        });

        // Find matching variant
        let matchedVariant = null;

        for (let variant of variants) {
            let matches = true;

            // Check each selected option against the variant
            for (let [optionName, optionValue] of Object.entries(selectedOptions)) {
                if (optionValue) {
                    // Find which option position this is
                    let optionPosition = null;
                    if (options && options.length > 0) {
                        const optionIndex = options.findIndex(opt => opt.name === optionName);
                        if (optionIndex !== -1) {
                            optionPosition = optionIndex + 1;
                        }
                    } else {
                        // Fallback: try to determine position from data attributes
                        const optionElement = document.querySelector(`input[name="options[${optionName}]"]`);
                        if (optionElement) {
                            optionPosition = parseInt(optionElement.dataset.optionPosition);
                        }
                    }

                    if (optionPosition) {
                        const variantOptionKey = `option${optionPosition}`;
                        if (variant[variantOptionKey] !== optionValue) {
                            matches = false;
                            break;
                        }
                    }
                }
            }

            if (matches) {
                matchedVariant = variant;
                break;
            }
        }

        if (matchedVariant) {
            // Update variant ID
            const variantInput = document.getElementById('variant-id');
            if (variantInput) {
                variantInput.value = matchedVariant.id;
            }

            // Update price if price element exists
            const priceElement = document.querySelector('.latest-price');
            if (priceElement && matchedVariant.price) {
                // Format price (assuming price is in cents)
                const formattedPrice = (matchedVariant.price / 100).toFixed(2);
                priceElement.textContent = `tk${formattedPrice}`;
            }

            // Update button
            const addButton = document.querySelector('button[name="add"]');
            if (addButton) {
                if (matchedVariant.available) {
                    addButton.disabled = false;
                    // Update button text to show it's available
                    const buttonText = addButton.innerHTML;
                    if (buttonText.includes('Sold Out')) {
                        addButton.innerHTML = buttonText.replace('Sold Out', 'add to cart');
                    } else if (buttonText.includes('add to bag')) {
                        // Keep as is
                    } else if (!buttonText.includes('add to cart') && !buttonText.includes('add to bag')) {
                        // If button doesn't have proper text, add it
                        const svgMatch = buttonText.match(/<svg[\s\S]*?<\/svg>/);
                        const spanMatch = buttonText.match(/<span[^>]*><\/span>/);
                        if (svgMatch && spanMatch) {
                            addButton.innerHTML = svgMatch[0] + ' add to cart ' + spanMatch[0];
                        }
                    }
                } else {
                    addButton.disabled = true;
                    // Update button text to show it's sold out
                    const buttonText = addButton.innerHTML;
                    if (buttonText.includes('add to cart') || buttonText.includes('add to bag')) {
                        addButton.innerHTML = buttonText.replace(/add to cart|add to bag/, 'Sold Out');
                    }
                }
            }

            // Dispatch custom event for other scripts to listen to
            document.dispatchEvent(new CustomEvent('variant:changed', {
                detail: {
                    variant: matchedVariant,
                    selectedOptions: selectedOptions
                }
            }));
        }
    }
});