<?php
// Database connection details
require '../configuration/config.php';

// Get order ID from URL parameter
$orderId = $_GET['order_id'];

// Prepare and execute SQL query to delete the order
$sql = "DELETE FROM orders WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $orderId);

if ($stmt->execute()) {
    echo "Order deleted successfully";
} else {
    echo "Error deleting order: " . $stmt->error;
}

$conn->close();
?>