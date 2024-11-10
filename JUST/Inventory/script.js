let data = []; // Declare data variable to store fetched data

// Function to fetch data from the database (using PHP)
function fetchData() {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "fetch_data.php", true); // Use "true" for asynchronous request

  xhr.onload = function() {
    if (this.status == 200) { // Check for successful response
      data = JSON.parse(this.response); // Parse JSON data and store in the 'data' variable
      populateProductTypeSelect(); // Populate the Product Type dropdown
      // Sum up quantities of same products
      data = sumUpQuantities(data);
      populateTable(data); // Populate the table with data
    } else {
      console.error("Error fetching data:", this.status); // Log error if any
    }
  };

  xhr.send(); // Send the AJAX request
}

// Function to populate the Product Type dropdown
function populateProductTypeSelect() {
  const productTypeSelect = document.getElementById("productType");
  const productTypes = ["Fabrics", "Threads", "Notions", "Tools"]; // Define product types

  productTypes.forEach(type => { // Loop through product types
    const option = document.createElement("option");
    option.value = type;
    option.text = type;
    productTypeSelect.add(option);
  });
}

// Function to populate the table with data
function populateTable(data, filterProductType = null, filterColor = null) {
  const tableBody = document.getElementById("inventoryTable").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ''; // Clear existing table data

  data.forEach(item => {
    if ((filterProductType === null || item.product_Type === filterProductType) &&
        (filterColor === null || item.color === filterColor)) {
      const row = tableBody.insertRow();
      const productNameCell = row.insertCell();
      const colorCell = row.insertCell();
      const productTypeCell = row.insertCell();
      const quantityCell = row.insertCell();

      productNameCell.innerHTML = item.product_name;
      colorCell.innerHTML = item.color;
      productTypeCell.innerHTML = item.product_Type;
      quantityCell.innerHTML = item.quantity;
    }
  });
}


// Function to handle clear button click
document.getElementById("clearButton").addEventListener("click", () => {
  // Reset Product Type and Color dropdowns
  document.getElementById("productType").value = "";  // Reset Product Type dropdown
  document.getElementById("color").value = "";  // Reset Color dropdown

  // Disable the color dropdown when cleared
  document.getElementById("color").disabled = true;

  // Populate the table with all data (no filters)
  populateTable(data);
});


// Function to handle search button click
document.getElementById("searchButton").addEventListener("click", () => {
  const selectedProductType = document.getElementById("productType").value;
  const selectedColor = document.getElementById("color").value;

  // If no product type is selected, show all data
  if (selectedProductType === "") {
    populateTable(data); // Show all products
  } else {
    // If no color is selected, treat it as "no filter" for color (pass null)
    const colorFilter = selectedColor === "" ? null : selectedColor;
    
    // Filter by product type and color (if color is selected)
    populateTable(data, selectedProductType, colorFilter);
  }
});


// Event listener for Product Type dropdown
document.getElementById("productType").addEventListener("change", () => {
  const selectedProductType = document.getElementById("productType").value;
  const colorSelect = document.getElementById("color");

  // Reset color options
  colorSelect.innerHTML = '<option value="">Select Color</option>'; 

  if (selectedProductType === "") {
    // Reset the table to show all products
    populateTable(data); 
    colorSelect.disabled = true;
  } else if (selectedProductType === "Tools") {
    colorSelect.disabled = true;
    colorSelect.innerHTML = '<option value="Not Applicable">Not Applicable</option>'; 
    // Filter the table to only show Toolss
    populateTable(data, selectedProductType); 
  } else {
    colorSelect.disabled = false;
    // Populate color options based on selected product type
    const availableColors = getAvailableColorsForProductType(selectedProductType); // Function to fetch colors from data based on selected product type
    availableColors.forEach(color => {
      const option = document.createElement("option");
      option.value = color;
      option.text = color;
      colorSelect.add(option);
    });
    // Refresh the table on product type change
    populateTable(data, selectedProductType); 
  }

});

// Call the function to fetch and display data on page load
fetchData();

// Function to get available colors for a specific product type (replace with your actual logic)
function getAvailableColorsForProductType(productType) {
  const colors = [];
  data.forEach(item => {
    if (item.product_Type === productType && !colors.includes(item.color)) {
      colors.push(item.color);
    }
  });
  return colors;
}

// Updated function to sum up quantities of same products
function sumUpQuantities(data) {
  const summedData = {}; // Use an object to store summed quantities

  data.forEach(item => {
    // Use a combination of product name and color as the key (if summing by name and color)
    const productKey = `${item.product_name}_${item.color}`; 

    if (productKey in summedData) {
      // Ensure the quantity is treated as a number when summing
      summedData[productKey].quantity += parseInt(item.quantity, 10); // Use parseInt to convert quantity to a number
    } else {
      // If the product doesn't exist, add it to the object
      summedData[productKey] = {
        product_name: item.product_name,
        color: item.color, // Keep color and type for display
        product_Type: item.product_Type,
        quantity: parseInt(item.quantity, 10), // Ensure quantity is a number
        supplier_name: item.supplier_name // Assuming you want to keep supplier name
      };
    }
  });

  // Convert the object back to an array
  return Object.values(summedData);
}

function updateBarWidth(barId, quantityNumberId, quantity, maxQuantity) {
  const bar = document.getElementById(barId);
  const quantityNumber = document.getElementById(quantityNumberId);
  
  const widthPercentage = (quantity / maxQuantity) * 100;
  bar.style.width = `${widthPercentage}%`;
  
  // Set the quantity number next to the label
  quantityNumber.innerHTML = quantity;
}

// Fetch the data from the PHP file
fetch('data.php')
  .then(response => response.json())
  .then(data => {
      // Maximum quantity (adjustable if needed)
      const maxFabricsQuantity = 5000;
      const maxThreadsQuantity = 1200;
      const maxNotionsQuantity = 1000;
      const maxToolsQuantity = 60;

      // Update each bar's width and quantity number using the data
      updateBarWidth("fabrics-quantity", "fabrics-quantity-number", data.Fabrics, maxFabricsQuantity);
      updateBarWidth("threads-quantity", "threads-quantity-number", data.Threads, maxThreadsQuantity);
      updateBarWidth("notions-quantity", "notions-quantity-number", data.Notions, maxNotionsQuantity);
      updateBarWidth("tools-quantity", "tools-quantity-number", data.Tools, maxToolsQuantity);
  })
  .catch(error => console.error('Error fetching data:', error));

const toggleLink = document.querySelector('.toggle');
const dropdown = document.querySelector('.dropdown');

// Toggle dropdown when clicking on the "Maintenance" link
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

// Function to update bar widths







