document.addEventListener('DOMContentLoaded', function () {

    // Cart Loading State Functions
    function showCartLoading() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.add('loading');
            const loadingElement = cartSidebar.querySelector('.cart-sidebar-loading');
            if (loadingElement) {
                loadingElement.style.display = 'flex';
            }
        }
    }

    function hideCartLoading() {
        const cartSidebar = document.querySelector('.cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('loading');
            const loadingElement = cartSidebar.querySelector('.cart-sidebar-loading');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }
    }

    document.querySelectorAll('form[action="/cart/add"]').forEach(function (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const submitButton = form.querySelector('[type="submit"]');
            if (submitButton) submitButton.disabled = true;

            // Show loading when adding to cart
            showCartLoading();

            fetch('/cart/add.js', {
                method: 'POST',
                body: new FormData(form),
                headers: {
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(() => {
                    refreshCartSidebar();
                    updateCartCount();
                })
                .catch(() => {
                    alert('Failed to add item to cart.');
                })
                .finally(() => {
                    if (submitButton) submitButton.disabled = false;
                    hideCartLoading();
                });
        });
    });


    function refreshCartSidebar() {
        fetch('/?sections=header')
            .then(res => res.json())
            .then(data => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = data.header;

                const newSidebar = tempDiv.querySelector('.cart-sidebar');
                const currentSidebar = document.querySelector('.cart-sidebar');

                if (newSidebar && currentSidebar) {
                    const isActive = currentSidebar.classList.contains('active');
                    const isLoading = currentSidebar.classList.contains('loading');

                    currentSidebar.replaceWith(newSidebar);

                    attachCartListeners();

                    if (isActive) {
                        document.querySelectorAll('.cart-sidebar, .cart-sidebar-box')
                            .forEach(el => el.classList.add('active'));
                    } else {
                        setTimeout(() => {
                            document.querySelectorAll('.cart-sidebar, .cart-sidebar-box')
                                .forEach(el => el.classList.add('active'));
                        }, 50);
                    }

                    // Restore loading state if it was active
                    if (isLoading) {
                        hideCartLoading();
                    }
                }
            })
            .catch(() => {
                console.error('Error refreshing cart sidebar');
                hideCartLoading();
            });
    }


    function updateCartCount() {
        fetch('/cart.js')
            .then(res => res.json())
            .then(cart => {
                document.querySelectorAll('.cart-item-count').forEach(el => {
                    el.textContent = cart.item_count;
                });
            });
    }


    function attachCartListeners() {


        document.querySelectorAll('.cart-sidebar-open-btn').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.cart-sidebar, .cart-sidebar-box')
                    .forEach(el => el.classList.add('active'));
            };
        });

        document.querySelectorAll('.cart-sidebar-close-window-btn, .side-cart-close-btn')
            .forEach(btn => {
                btn.onclick = () => {
                    document.querySelectorAll('.cart-sidebar, .cart-sidebar-box')
                        .forEach(el => el.classList.remove('active'));
                };
            });


        document.querySelectorAll('.cart-delete-btn').forEach(btn => {
            btn.onclick = function () {
                const itemKey = btn.dataset.itemKey;
                btn.disabled = true;

                // Show loading when deleting item
                showCartLoading();

                fetch('/cart/change.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: itemKey, quantity: 0 })
                })
                    .then(() => refreshCartSidebar())
                    .catch(() => {
                        alert('Failed to remove item.');
                        btn.disabled = false;
                        hideCartLoading();
                    });
            };
        });


        document.querySelectorAll('.cart-quantity-number').forEach(input => {
            input.onchange = function () {
                const newQuantity = parseInt(input.value, 10);
                const itemKey = input.dataset.itemKey;
                input.disabled = true;

                if (isNaN(newQuantity) || newQuantity < 0) {
                    alert('Invalid quantity');
                    input.disabled = false;
                    return;
                }

                // Show loading when updating quantity
                showCartLoading();

                fetch('/cart/change.js', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: itemKey, quantity: newQuantity })
                })
                    .then(() => refreshCartSidebar())
                    .catch(() => {
                        alert('Failed to update quantity.');
                        input.disabled = false;
                        hideCartLoading();
                    });
            };
        });


        document.querySelectorAll('.cart-quantity-decrease').forEach(btn => {
            btn.onclick = function () {
                const input = btn.parentElement.querySelector('.cart-quantity-number');
                if (input && parseInt(input.value, 10) > 1) {
                    input.value = parseInt(input.value, 10) - 1;
                    input.dispatchEvent(new Event('change'));
                }
            };
        });


        document.querySelectorAll('.cart-quantity-increase').forEach(btn => {
            btn.onclick = function () {
                const input = btn.parentElement.querySelector('.cart-quantity-number');
                if (input) {
                    input.value = parseInt(input.value || 0, 10) + 1;
                    input.dispatchEvent(new Event('change'));
                }
            };
        });

        updateCartCount();
    }

    attachCartListeners();

});
