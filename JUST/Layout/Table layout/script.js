// script.js
const Table = document.getElementById('supplierTable');
const tbody = Table.querySelector('tbody');

// Modal elements (make sure these IDs match your HTML)
const modal = document.getElementById('modal'); 
const modalContent = document.querySelector('.modal-content');
const closeButton = document.querySelector('.close');
const modalSupplierName = document.getElementById('modal-supplier-name');
const modalAddress = document.getElementById('modal-address');
const modalPhoneNumber = document.getElementById('modal-phone-number');
const modalEmail = document.getElementById('modal-email');

// Fetch data
fetch('get_supplier.php') // Replace with your actual PHP file
    .then(response => response.json())
    .then(data => {
        // Populate the table
        data.suppliers.forEach(supplier => {
            const row = document.createElement('tr');
            const nameCell = document.createElement('td');
            const phoneCell = document.createElement('td');
            const addressCell = document.createElement('td');
            const emailCell = document.createElement('td');
            const actionCell = document.createElement('td');
            actionCell.classList.add('action-cell'); 

            nameCell.textContent = supplier.supplier_name;
            phoneCell.textContent = supplier.phone_number;
            addressCell.textContent = supplier.address;
            emailCell.textContent = supplier.email;

            const seeDetailsButton = document.createElement('button');
            seeDetailsButton.classList.add('seedetails-button');
            seeDetailsButton.textContent = 'See Details';

            // Add event listener to the button
            seeDetailsButton.addEventListener('click', () => {
                // Populate modal data
                modalSupplierName.textContent = supplier.supplier_name;
                modalAddress.textContent = supplier.address;
                modalPhoneNumber.textContent = supplier.phone_number;
                modalEmail.textContent = supplier.email;

                // Fetch products for this supplier
                fetch('get_products.php?supplier_id=' + supplier.supplier_id) // Replace with your actual PHP file
                    .then(response => response.json())
                    .then(products => {
                        // Populate the products table
                        const productsTableBody = document.querySelector('#productsTable tbody');
                        productsTableBody.innerHTML = ''; // Clear any existing data
                        products.forEach(product => {
                            const productRow = document.createElement('tr');
                            const productNameCell = document.createElement('td');
                            const colorCell = document.createElement('td');
                            const unitPriceCell = document.createElement('td');

                            productNameCell.textContent = product.product_name;
                            
                            // Check if 'color' exists and add "Not Applicable" if not
                            if (!product.hasOwnProperty('color')) { 
                                colorCell.textContent = "Not Applicable";
                            } else {
                                colorCell.textContent = product.color;
                            }

                            unitPriceCell.textContent = product.unit_price;

                            productRow.appendChild(productNameCell);
                            productRow.appendChild(colorCell);
                            productRow.appendChild(unitPriceCell);

                            productsTableBody.appendChild(productRow);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching products:', error);
                    });

                // Show the modal
                modal.style.display = 'block';
            });

            actionCell.appendChild(seeDetailsButton);

            row.appendChild(nameCell);
            row.appendChild(phoneCell);
            row.appendChild(addressCell);
            row.appendChild(emailCell);
            row.appendChild(actionCell);

            tbody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

// Close modal when the close button is clicked
closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}