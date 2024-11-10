<?php
// Database connection details
require '../../configuration/config.php';

// Get order ID from URL parameter
$orderId = $_GET['order_id']; 

// Prepare and execute SQL query to update archive_status
$sql = "UPDATE bargraph_data.orders SET archive_status = 'Unarchived' WHERE order_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $orderId);

if ($stmt->execute()) {
    echo "Order unarchived successfully";
} else {
    echo "Error unarchiving order: " . $stmt->error;
}

$conn->close();
?>