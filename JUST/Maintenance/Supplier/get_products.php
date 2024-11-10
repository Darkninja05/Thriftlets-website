<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bargraph_data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the supplier ID from the query string
$supplier_id = $_GET['supplier_id'];

// Fetch product data for the given supplier
$sql = "SELECT product_id, product_name, color, product_type, unit_price FROM products WHERE supplier_id = '$supplier_id'";
$result = $conn->query($sql);

$products = [];
$productNames = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // Check if product name already exists and if product_type is not 'tool'
        if (!in_array($row['product_name'], $productNames) && $row['product_type'] !== 'Tools') {
            $products[] = $row;
            $productNames[] = $row['product_name'];
        } elseif (!in_array($row['product_name'], $productNames) && $row['product_type'] === 'Tools') {
            // If product_type is 'tool', remove the 'color' key
            unset($row['color']);
            $products[] = $row;
            $productNames[] = $row['product_name'];
        }
    }
} else {
    echo "0 results";
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode($products);

$conn->close();
?>