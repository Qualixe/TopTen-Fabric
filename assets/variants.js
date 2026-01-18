/**
 * Product Variants - jQuery Version
 * Handles dynamic availability based on selected options
 */

$(document).ready(function () {

    // Get product data
    const variants = window.productData ? window.productData.variants : [];
    const options = window.productData ? window.productData.options : [];

    if (!variants.length) {
        initBasicFunctionality();
        return;
    }

    initBasicFunctionality();
    initVariantFunctionality();

    function initBasicFunctionality() {
        // Quantity controls or other basic logic
    }

    function initVariantFunctionality() {
        const $variantOptions = $('.variant-option');

        if (!$variantOptions.length) return;

        // Change handler
        $variantOptions.on('change', function () {
            updateVariantAvailability();
            updateVariant();
        });

        // Prevent clicking disabled inputs
        $variantOptions.on('click', function (e) {
            if (
                this.disabled ||
                $(this).closest('.product-varient-input-field').hasClass('disabled')
            ) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        // Prevent clicking disabled labels
        $('.product-varient-label').on('click', function (e) {
            if ($(this).closest('.product-varient-input-field').hasClass('disabled')) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });

        initializeVariantStates();

        // Delay for multi-option products
        setTimeout(function () {
            updateVariantAvailability();
            updateVariant();
        }, 100);
    }

    function initializeVariantStates() {
        $('.variant-option').each(function () {
            const $field = $(this).closest('.product-varient-input-field');
            if ($field.hasClass('disabled')) {
                $(this).prop('disabled', true);
            }
        });
    }

    function updateVariantAvailability() {
        const selectedOptions = {};
        const optionGroups = {};

        $('.variant-option').each(function () {
            const optionName = this.name.replace('options[', '').replace(']', '');

            if (!optionGroups[optionName]) {
                optionGroups[optionName] = [];
            }
            optionGroups[optionName].push(this);

            if (this.checked) {
                selectedOptions[optionName] = this.value;
            }
        });

        $.each(optionGroups, function (optionName, optionsInGroup) {

            $.each(optionsInGroup, function (_, option) {
                const optionValue = option.value;
                const $inputField = $(option).closest('.product-varient-input-field');

                if (!$inputField.length) return;

                const testSelection = {};

                // Copy selected options except current group
                $.each(selectedOptions, function (key, value) {
                    if (key !== optionName) {
                        testSelection[key] = value;
                    }
                });

                testSelection[optionName] = optionValue;

                let isAvailable = false;

                $.each(variants, function (_, variant) {
                    let matches = true;

                    $.each(testSelection, function (testName, testValue) {
                        if (!testValue) return;

                        let position = null;

                        if (options && options.length) {
                            const index = options.findIndex(o => o.name === testName);
                            if (index !== -1) position = index + 1;
                        } else {
                            const $el = $(`input[name="options[${testName}]"]`);
                            if ($el.data('option-position')) {
                                position = parseInt($el.data('option-position'));
                            }
                        }

                        if (position && variant[`option${position}`] !== testValue) {
                            matches = false;
                            return false;
                        }
                    });

                    if (matches && variant.available) {
                        isAvailable = true;
                        return false;
                    }
                });

                $inputField.toggleClass('disabled', !isAvailable);
                $(option).prop('disabled', !isAvailable);
            });
        });
    }

    function updateVariant() {
        const selectedOptions = {};

        $('.variant-option:checked').each(function () {
            const optionName = this.name.replace('options[', '').replace(']', '');
            selectedOptions[optionName] = this.value;
        });

        let matchedVariant = null;

        $.each(variants, function (_, variant) {
            let matches = true;

            $.each(selectedOptions, function (optionName, optionValue) {
                let position = null;

                if (options && options.length) {
                    const index = options.findIndex(o => o.name === optionName);
                    if (index !== -1) position = index + 1;
                } else {
                    const $el = $(`input[name="options[${optionName}]"]`);
                    position = parseInt($el.data('option-position'));
                }

                if (position && variant[`option${position}`] !== optionValue) {
                    matches = false;
                    return false;
                }
            });

            if (matches) {
                matchedVariant = variant;
                return false;
            }
        });

        if (!matchedVariant) return;

        // Update variant ID
        $('#variant-id').val(matchedVariant.id);

        // Update price
        if (matchedVariant.price) {
            $('.latest-price').text(`$${(matchedVariant.price / 100).toFixed(2)}`);
        }

        // Update add-to-cart button
        const $addButton = $('button[name="add"]');

        if ($addButton.length) {
            let html = $addButton.html();

            if (matchedVariant.available) {
                $addButton.prop('disabled', false);

                if (html.includes('Sold Out')) {
                    $addButton.html(html.replace('Sold Out', 'add to cart'));
                }
            } else {
                $addButton.prop('disabled', true);

                if (html.match(/add to cart|add to bag/i)) {
                    $addButton.html(html.replace(/add to cart|add to bag/i, 'Sold Out'));
                }
            }
        }

        // Dispatch custom event
        $(document).trigger('variant:changed', {
            variant: matchedVariant,
            selectedOptions: selectedOptions
        });
    }

});
