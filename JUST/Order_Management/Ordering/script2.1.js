document.addEventListener('DOMContentLoaded', function () {
    const toggleLink = document.querySelector('.toggle');
    const dropdown = document.querySelector('.dropdown');

    const supplierSelect = document.getElementById('supplier');
    const productSelect = document.getElementById('product');
    const unitPriceInput = document.getElementById('unitPrice');
    const quantityInput = document.getElementById('quantity');
    const totalPriceInput = document.getElementById('totalPrice');
    const colorSelect = document.getElementById('color');
    const productTypeInput = document.getElementById('productType');

    const addToCartBtn = document.getElementById('addToCartBtn');
    const cartTableBody = document.getElementById('cartTableBody');

    const buyAllBtn = document.getElementById('buyAllBtn');
    const addressInput = document.getElementById('address');
    const paymentMethodSelect = document.getElementById('paymentMethod');

    const addToCartModal = document.getElementById('addToCartModal');
    const closeAddToCartModal = document.getElementById('closeAddToCartModal');
    const addItemButton = document.getElementById('addItemButton');

    const orderConfirmation = document.getElementById('orderConfirmation');
    const confirmOrderBtn = document.getElementById('confirmOrderBtn');
    const cancelOrderBtn = document.getElementById('cancelOrderBtn');
    const confirmationTableBody = document.getElementById('confirmationTableBody');
    const confirmationAddress = document.getElementById('confirmationAddress');
    const confirmationPaymentMethod = document.getElementById('confirmationPaymentMethod');
    const confirmationTotalPrice = document.getElementById('confirmationTotalPrice');

    
    toggleLink.addEventListener('click', (e) => {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
      
      // Hide dropdown if clicking outside
      document.addEventListener('click', (e) => {
        // If the click is outside the toggle link and dropdown, retract it
        if (!dropdown.contains(e.target) && !toggleLink.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });

    let cart = [];

    // Close add to cart modal
    closeAddToCartModal.addEventListener('click', function () {
        addToCartModal.style.display = 'none';
    });

    // Open add to cart modal
    addItemButton.addEventListener('click', function () {
        addToCartModal.style.display = 'block';
    });

    function openModal() {
        addToCartModal.style.display = 'block';
    }

    window.onclick = function(event) {
        if (event.target === addToCartModal) {
            addToCartModal.style.display = "none";
        }
        if (event.target === orderConfirmation) {
            orderConfirmation.style.display = "none";
        }
    };

    colorSelect.disabled = true;
    productTypeInput.disabled = true; // Disable product type input 

    // Fetch suppliers when the page loads
    fetch('get_data.php?suppliers=true')
        .then(response => response.json())
        .then(suppliers => {
            suppliers.forEach(supplier => {
                const option = document.createElement('option');
                option.value = supplier.supplier_id;
                option.textContent = supplier.supplier_name;
                supplierSelect.appendChild(option);
            });
        });

    // Fetch products when a supplier is selected
    supplierSelect.addEventListener('change', function () {
        const supplier_id = this.value;
        productSelect.innerHTML = '<option value="">Select Product</option>';
        colorSelect.innerHTML = '<option value="">Select Color</option>'; // Clear color options
        unitPriceInput.value = '';
        totalPriceInput.value = '';
        productSelect.disabled = true;
        colorSelect.disabled = true;  // Disable color and product type select
        productTypeInput.disabled = true;  // Disable product type input

        if (supplier_id) {
            fetch(`get_data.php?supplier_id=${supplier_id}`)
                .then(response => response.json())
                .then(products => {
                    products.forEach(product => {
                        const option = document.createElement('option');
                        option.value = JSON.stringify({ 
                            id: product.product_id, 
                            price: product.unit_price, 
                            name: product.product_name,
                            type: product.product_type // Include product type
                        });
                        option.textContent = product.product_name;
                        productSelect.appendChild(option);
                    });
                    productSelect.disabled = false;
                });
        }
    });

    // Set unit price, color, and total price when a product is selected
    productSelect.addEventListener('change', function () {
        const selectedProduct = JSON.parse(this.value);
        unitPriceInput.value = selectedProduct.price;
        
        // Fetch color options for the selected product
        fetch(`get_data.php?product_id=${selectedProduct.id}`)
            .then(response => response.json())
            .then(colors => {
                if (colors.length > 0) {
                    // Clear existing color options
                    colorSelect.innerHTML = '<option value="">Select Color</option>';

                    colors.forEach(color => {
                        const option = document.createElement('option');
                        option.value = color;
                        option.textContent = color;
                        colorSelect.appendChild(option); // Add the option to the color select
                    });
                } else {
                    // Handle the case where no colors are available
                    colorSelect.disabled = true;
                    colorSelect.innerHTML = '<option value="Not Applicable">Not Applicable</option>'; // Set the "Not Applicable" option
                    alert('No colors available for this product.');
                }

                // Set the product type input value AFTER fetching colors
                productTypeInput.value = selectedProduct.type;
                productTypeInput.disabled = false; // Enable product type input

                // Disable color select if product type is "Tools"
                if (selectedProduct.type === "Tools") {
                    colorSelect.disabled = true;
                    colorSelect.innerHTML = '<option value="Not Applicable">Not Applicable</option>'; // Set the "Not Applicable" option
                } else {
                    colorSelect.disabled = false;
                }
            });

        calculateTotal();
    });

    // Calculate total price when quantity changes
    quantityInput.addEventListener('input', calculateTotal);

    function calculateTotal() {
        const quantity = parseFloat(quantityInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        const totalPrice = quantity * unitPrice;
        totalPriceInput.value = totalPrice.toFixed(2);
    }

    // Add to cart button click
    addToCartBtn.addEventListener('click', function () {
        const supplier = supplierSelect.value;
        const supplierName = supplierSelect.options[supplierSelect.selectedIndex].text;
        const product = JSON.parse(productSelect.value);
        const color = colorSelect.value; // Get the selected color
        const quantity = parseFloat(quantityInput.value);
        const unitPrice = parseFloat(unitPriceInput.value);
        const totalPrice = parseFloat(totalPriceInput.value);
        const productType = productTypeInput.value;

        if (!supplier || !product.id || !quantity || !unitPrice || !totalPrice || !productType) {
            alert('Please fill in all fields in the modal!');
            return;
        }

        // Check if color is required (only if product type is NOT "Tools")
        if (productType !== "Tools" && !color) {
            alert('Please select a color!');
            return;
        }

        const item = {
            supplier,
            supplierName,
            product: product.id,
            productName: product.name,
            color, // Add color to the item object
            productType,
            quantity,
            unitPrice,
            totalPrice
        };
        cart.push(item);
        renderCart();

        // Reset form fields after adding to cart
        supplierSelect.value = "";
        productSelect.innerHTML = '<option value="">Select Product</option>';
        productSelect.disabled = true;
        colorSelect.innerHTML = '<option value="">Select Color</option>'; // Reset color options
        colorSelect.disabled = true; // Disable color selection
        productTypeInput.value = ""; // Reset product type input
        productTypeInput.disabled = true;
        quantityInput.value = "";
        unitPriceInput.value = "";
        totalPriceInput.value = "";
        addToCartModal.style.display = 'none'; // Close the modal
    });

    // Render cart items
    function renderCart() {
        cartTableBody.innerHTML =  `
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                    <button id="addItemButton" class="plus-button">+</button>
                </td>
            </tr>
        `;

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.supplierName}</td>
                <td>${item.productName}</td>
                <td>${item.productType}</td>
                <td>${item.color}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
                <td>
                    <button class="removeBtn" data-index="${index}">Remove</button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });

        // Add remove event listeners
        document.querySelectorAll('.removeBtn').forEach(button => {
            button.addEventListener('click', removeItem);
        });

        document.getElementById('addItemButton').addEventListener('click', openModal);
    }

    // Remove an item from the cart
    function removeItem(event) {
        const index = event.target.getAttribute('data-index');
        cart.splice(index, 1);
        renderCart();
    }

    // Buy all items
    buyAllBtn.addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
    
        // Check if address and payment method are filled
        if (!addressInput.value || !paymentMethodSelect.value) {
            alert('Please fill in your address and payment method.');
            return;
        }
    
        // Populate confirmation table
        confirmationTableBody.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.supplierName}</td>
                <td>${item.productName}</td>
                <td>${item.productType}</td>
                <td>${item.color}</td>
                <td>${item.quantity}</td>
                <td>${item.unitPrice.toFixed(2)}</td>
                <td>${item.totalPrice.toFixed(2)}</td>
            `;
            confirmationTableBody.appendChild(row);

            
        });
    
        // Calculate and display total price
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += item.totalPrice;
        });
        confirmationTotalPrice.textContent = totalPrice.toFixed(2);
        
    
        // Display address and payment method
        confirmationAddress.textContent = addressInput.value;
        confirmationPaymentMethod.textContent = paymentMethodSelect.value;
    
        // Show confirmation notification
        orderConfirmation.style.display = 'block'; 
    });

    // Confirm Order Button
    confirmOrderBtn.addEventListener('click', function () {
        console.log("cart", cart);
        cart.forEach(item => {
            const data = {
                supplier: item.supplier,
                product: item.product,
                productType: item.productType,
                color: item.color, // Add color to the data object
                quantity: item.quantity,
                totalPrice: item.totalPrice,
                address: addressInput.value,
                paymentMethod: paymentMethodSelect.value
            };
            console.log("data", data);
            // Send order data to the server
            fetch('submit_order.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log('Order placed successfully:', result.message);
                } else {
                    console.error('Order failed:', result.message);
                }
            });
        });

        // After submitting the order:
        orderConfirmation.style.display = 'none'; // Hide the notification
        showNotification('All items purchased successfully!');
        cart = []; // Clear cart after purchase
        renderCart();

        // Clear address and payment method fields
        document.getElementById('address').value = "";  
        document.getElementById('paymentMethod').value = ""; 
    });

    // Cancel Order Button
    cancelOrderBtn.addEventListener('click', function () {
        orderConfirmation.style.display = 'none'; // Hide the notification
    });

    // Show notification for actions
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.classList.add('notification');
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 1000);
    }
});