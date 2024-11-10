// script.js

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

              const actionCell = row.insertCell();
              const actionButtons = document.createElement('div');
              actionButtons.classList.add('action-buttons');
      
              // Unarchive button
              const unarchiveButton = document.createElement('button');
              unarchiveButton.classList.add('unarchive-button');
              unarchiveButton.textContent = 'Unarchived';
              unarchiveButton.addEventListener('click', () => {
                unarchiveOrder(order.order_id);
              });
              actionButtons.appendChild(unarchiveButton);
      
              // Delete button (optional)
              const deleteButton = document.createElement('button');
              deleteButton.classList.add('delete-button');
              deleteButton.textContent = 'Delete';
              deleteButton.addEventListener('click', () => {
                deleteOrder(order.order_id);
              });
              actionButtons.appendChild(deleteButton);
      
              actionCell.appendChild(actionButtons);
          });
      })
      .catch(error => {
          console.error('Error loading orders:', error);
      });
}



function unarchiveOrder(orderId) {
  fetch('unarchive_order.php?order_id=' + orderId, {
    method: 'POST'
  })
  .then(response => {
    // Handle response (e.g., refresh the table)
    console.log('Order unarchived successfully');
    // Refresh the table after unarchiving with a timeout
    setTimeout(() => {
      location.reload();
    }, 0); // Timeout of 1 second (adjust as needed)
  })
  .catch(error => {
    console.error('Error unarchiving order:', error);
  });
}

// Function to delete an order
function deleteOrder(orderId) {
  fetch('delete_order.php?order_id=' + orderId, {
    method: 'POST'
  })
  .then(response => {
    // Handle response (e.g., remove the row from the table)
    console.log('Order deleted successfully');
    // Refresh the table after deleting with a timeout
    setTimeout(() => {
      location.reload(); 
    }, 0); // Timeout of 1 second (adjust as needed)
  })
  .catch(error => {
    console.error('Error deleting order:', error);
  });
}

// Initial fetch on page load
fetchArchivedOrders();
