<?php
// get_data.php

// Database connection settings
require '../../configuration/config.php';
// Set the content type to JSON
header('Content-Type: application/json');

// Fetch suppliers if requested
if (isset($_GET['suppliers'])) {
    $result = $conn->query("SELECT supplier_id, supplier_name FROM suppliers");

    if ($result && $result->num_rows > 0) {
        $suppliers = [];
        while ($row = $result->fetch_assoc()) {
            $suppliers[] = $row;
        }
        echo json_encode($suppliers);  // Return supplier data as JSON
    } else {
        echo json_encode([]);  // Return empty array if no suppliers found
    }
    exit();
}

// Fetch products based on supplier_id if requested
if (isset($_GET['supplier_id'])) {
    $supplier_id = intval($_GET['supplier_id']);  // Sanitize supplier ID
    $result = $conn->query("SELECT product_id, product_type, color, unit_price, product_name FROM products WHERE supplier_id = $supplier_id");

    if ($result && $result->num_rows > 0) {
        $products = [];
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
        echo json_encode($products);  // Return products data as JSON
    } else {
        echo json_encode([]);  // Return empty array if no products found
    }
    exit();
}

// Fetch colors based on product_id if requested
if (isset($_GET['product_id'])) {
    $product_id = intval($_GET['product_id']); // Sanitize product ID
    $result = $conn->query("SELECT color FROM products WHERE product_id = $product_id");

    if ($result && $result->num_rows > 0) {
        $colors = [];
        while ($row = $result->fetch_assoc()) {
            $colors[] = $row['color'];
        }
        echo json_encode($colors); // Return product colors as JSON
    } else {
        echo json_encode([]); // Return empty array if no colors found
    }
    exit();
}

$conn->close();
?>