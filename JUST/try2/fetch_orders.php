<?php
require '../configuration/config.php';

// Function to fetch orders
function fetchOrders() {
    global $conn;

    // SQL query to fetch orders (excluding delivered and archived orders)
    $sql = "SELECT o.order_id, s.supplier_name, p.product_name, p.product_type, p.color, o.quantity, o.total_price, o.payment_method, o.order_date, o.order_status
            FROM orders o
            JOIN suppliers s ON o.supplier_id = s.supplier_id
            JOIN products p ON o.product_id = p.product_id
            WHERE o.archive_status != 'Unarchived'";

    $result = $conn->query($sql);

    $orders = array();
    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            $orders[] = $row;
        }
    } else {
        echo "No orders found.";
    }

    return $orders;
}


// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['order_id']) && isset($_POST['new_status'])) {
        $orderId = $_POST['order_id'];
        $newStatus = $_POST['new_status'];
        updateOrderStatus($orderId, $newStatus);
    }
} else if (isset($_GET['order_id'])) {
    if (isset($_GET['action']) && $_GET['action'] === 'delete') {
        deleteOrder($_GET['order_id']);
    } else {
        fetchOrderDetails($_GET['order_id']);
    }
} else {
    $orders = fetchOrders();

    // Return orders as JSON
    header('Content-Type: application/json');
    echo json_encode($orders);
}

$conn->close();
?>