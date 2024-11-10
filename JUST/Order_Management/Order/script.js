// script.js
const toggleLink = document.querySelector('.toggle');
const dropdown = document.querySelector('.dropdown');

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


document.addEventListener('DOMContentLoaded', function() {
  loadOrders();
});

function loadOrders() {
  const tableBody = document.querySelector('#orderTable tbody');
  tableBody.innerHTML = '';

  fetch('fetch_orders.php')
      .then(response => response.json())
      .then(orders => {
          orders.forEach(order => {
              const row = tableBody.insertRow();
              row.dataset.orderId = order.order_id; 

              row.insertCell().textContent = order.supplier_name;
              row.insertCell().textContent = order.product_name;
              row.insertCell().textContent = order.product_type;

              // Check if the product type is "Tools"
              if (order.product_type === 'Tools') {
                  row.insertCell().textContent = 'Not Applicable'; 
              } else {
                  row.insertCell().textContent = order.color; 
              }

              row.insertCell().textContent = order.quantity;
              row.insertCell().textContent = order.total_price;
              row.insertCell().textContent = order.payment_method;
              row.insertCell().textContent = order.order_date;

              // Add status column with color based on order_status
              const statusCell = row.insertCell();
              statusCell.textContent = order.order_status;
              switch (order.order_status) {
                  case 'Delivered':
                      statusCell.style.backgroundColor = 'green';
                      break;
                  case 'Process':
                      statusCell.style.backgroundColor = 'red';
                      break;
                  case 'Delivering':
                      statusCell.style.backgroundColor = 'yellow';
                      break;
                  default:
                      statusCell.style.backgroundColor = 'white';
                      break;
              }

              // No need for archiveStatusCell

              const actionCell = row.insertCell();
              actionCell.classList.add('action-buttons');

              // Add details button
              const detailsButton = document.createElement('button');
              detailsButton.classList.add('details-button');
              detailsButton.textContent = 'See Details';
              detailsButton.addEventListener('click', () => {
                  fetch(`order_details.php?order_id=${order.order_id}`)
                      .then(response => response.text())
                      .then(detailsHTML => {
                          document.getElementById('orderDetailsModal').style.display = 'block';
                          document.querySelector('#orderDetailsModal .modal-body').innerHTML = detailsHTML;

                          // Add click handler to the window
                          window.onclick = function(event) {
                              if (event.target == document.getElementById('orderDetailsModal')) {
                                  closeModal();
                              }
                          }

                          // Get the existing archive button (if it exists) or create it
                          let archiveButton = document.querySelector('#orderDetailsModal .modal-footer .archive-button');
                          if (!archiveButton) {
                              archiveButton = document.createElement('button');
                              archiveButton.classList.add('archive-button');
                              archiveButton.textContent = 'Archive';
                              document.querySelector('#orderDetailsModal .modal-footer').appendChild(archiveButton);
                          }

                          // Update the data-order-id attribute of the archive button
                          archiveButton.dataset.orderId = order.order_id;
                          archiveButton.addEventListener('click', () => {
                              // You can add a confirmation here if you want
                              // if (confirm(`Are you sure you want to archive this order?`)) {
                              //   archiveOrder(order.order_id, 'Archived'); 
                              // }

                              // This will reload the page. You might want to use a more specific update function.
                              archiveOrder(order.order_id, 'Archived'); 
                          });
                      })
                      .catch(error => {
                          console.error('Error loading order details:', error);
                      });
              });
              actionCell.appendChild(detailsButton);

              // Add update status button
              const updateStatusButton = document.createElement('button');
              updateStatusButton.classList.add('update-status-button');
              updateStatusButton.textContent = 'Update Status';
              updateStatusButton.addEventListener('click', () => {
                  // Open the update status modal
                  document.getElementById('updateStatusModal').style.display = 'block';
                  // Store the order ID for later use in the update function
                  updateStatusButton.dataset.orderId = order.order_id; 
              });
              actionCell.appendChild(updateStatusButton);
          });
      })
      .catch(error => {
          console.error('Error loading orders:', error);
      });
}

// Function to close the modal
function closeModal() {
  document.getElementById('orderDetailsModal').style.display = 'none';
  document.getElementById('updateStatusModal').style.display = 'none';
  // Remove the click handler from the window
  window.onclick = null;
}


// Function to handle updating order status (now with confirmation)
function confirmUpdateStatus() {
  const orderId = document.querySelector('.update-status-button[data-order-id]').dataset.orderId; 
  const newStatus = document.getElementById('newStatus').value;
  if (confirm(`Are you sure you want to update the status to '${newStatus}'?`)) {
    updateOrderStatus(orderId, newStatus);
  }
}

// Function to send the update request to the server
function updateOrderStatus(orderId, newStatus) {
  fetch('fetch_orders.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `order_id=${orderId}&new_status=${newStatus}`
  })
  .then(response => {
    if (response.ok) {
      // Update the table row with the new status
      const statusCell = document.querySelector(`#orderTable tr[data-order-id="${orderId}"] td:nth-child(9)`); 
      statusCell.textContent = newStatus;
      // Update the background color of the status cell
      switch (newStatus) {
        case 'Delivered':
          statusCell.style.backgroundColor = 'green';
          break;
        case 'Process':
          statusCell.style.backgroundColor = 'red';
          break;
        case 'Delivering':
          statusCell.style.backgroundColor = 'yellow';
          break;
        default:
          statusCell.style.backgroundColor = 'white';
          break;
      }
      closeModal(); // Close the modal after updating
      // Refresh the page
      setTimeout(function() {
          location.reload(); 
      }, 2000); 
    } else {
      console.error('Error updating order status:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error updating order status:', error);
  });
}

// Function to handle archiving an order
function archiveOrder(orderId, newStatus) {
  fetch('fetch_orders.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `order_id=${orderId}&archive_status=${newStatus}`
  })
  .then(response => {
    if (response.ok) {

      setTimeout(function() {
          location.reload(); 
      }, 0); 
    } else {
      console.error('Error archiving order:', response.statusText);
    }
  })
  .catch(error => {
    console.error('Error archiving order:', error);
  });
}