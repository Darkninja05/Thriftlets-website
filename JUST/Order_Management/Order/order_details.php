<?php
// Database connection details
require '../../configuration/config.php';
// Get order ID from URL parameter
$orderId = $_GET['order_id'];

// Prepare and execute SQL query to fetch order details (without status)
$sql = "SELECT s.supplier_name, p.product_name, p.product_type, p.color, o.quantity, o.total_price, o.payment_method, o.order_date, o.order_status
        FROM orders o
        JOIN suppliers s ON o.supplier_id = s.supplier_id
        JOIN products p ON o.product_id = p.product_id
        WHERE o.order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $orderId);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $order = $result->fetch_assoc();

    // Display order details (customize this as needed)
    echo "<p>Supplier: " . $order['supplier_name'] . "</p>";
    echo "<p>Product: " . $order['product_name'] . "</p>";
    echo "<p>Product Type: " . $order['product_type'] . "</p>";
    
    // Display color based on product type
    if ($order['product_type'] === 'Tools') {
        echo "<p>Color: Not Applicable</p>";
    } else {
        echo "<p>Color: " . $order['color'] . "</p>";
    }

    echo "<p>Quantity: " . $order['quantity'] . "</p>";
    echo "<p>Total Price: " . $order['total_price'] . "</p>";
    echo "<p>Payment Method: " . $order['payment_method'] . "</p>";
    echo "<p>Order Date: " . $order['order_date'] . "</p>";
    echo "<p>Order Status: " . $order['order_status'] . "</p>";
} else {
    echo "Order not found.";
}

$conn->close();
?>