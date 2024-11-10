<?php
require '../../configuration/config.php';

// Function to fetch orders
function fetchOrders() {
    global $conn;

    // SQL query to fetch orders (excluding delivered and archived orders)
    $sql = "SELECT o.order_id, s.supplier_name, p.product_name, p.product_type, p.color, o.quantity, o.total_price, o.payment_method, o.order_date, o.order_status
            FROM orders o
            JOIN suppliers s ON o.supplier_id = s.supplier_id
            JOIN products p ON o.product_id = p.product_id
            WHERE o.order_status != 'Delivered' AND o.archive_status != 'Archived'";

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

// Function to fetch order details
function fetchOrderDetails($orderId) {
    global $conn;

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

        // Add the "Archive" button to the modal
        echo '<button class="archive-button">Archive</button>';
    } else {
        echo "Order not found.";
    }
}

// Function to delete an order
function deleteOrder($orderId) {
    global $conn;

    // Prepare and execute SQL query to delete the order
    $sql = "DELETE FROM orders WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $orderId);

    if ($stmt->execute()) {
        echo "Order deleted successfully";
    } else {
        echo "Error deleting order: " . $stmt->error;
    }
}

// Function to update order status
function updateOrderStatus($orderId, $newStatus) {
    global $conn;

    // Prepare and execute SQL query to update the order status
    $sql = "UPDATE orders SET order_status = ? WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $orderId);

    if ($stmt->execute()) {
        if ($newStatus === 'Delivered') {
            // Move the order to Inventory table
            moveOrderToInventory($orderId);
        }
        echo "Order status updated successfully";
    } else {
        echo "Error updating order status: " . $stmt->error;
    }
}

// Function to update order archive status
function updateOrderArchiveStatus($orderId, $newStatus) {
    global $conn;

    // Prepare and execute SQL query to update the order archive status
    $sql = "UPDATE orders SET archive_status = ? WHERE order_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $newStatus, $orderId);

    if ($stmt->execute()) {
        echo "Order archive status updated successfully";
    } else {
        echo "Error updating order archive status: " . $stmt->error;
    }
}

// Function to move order to Inventory table
function moveOrderToInventory($orderId) {
    global $conn;

    // Fetch order details
    $sql = "SELECT s.supplier_name, p.product_name, p.product_type, p.color, o.quantity
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

        // Set color to 'Not Applicable' if product type is 'Tools'
        $color = ($order['product_type'] === 'Tools') ? 'Not Applicable' : $order['color']; 

        // Insert order details into Inventory table
        $sql = "INSERT INTO inventory (order_id, supplier_name, product_name, product_type, color, quantity) 
                VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        // Bind the correct number of parameters (6 in total)
        $stmt->bind_param("isssss", $orderId, $order['supplier_name'], $order['product_name'], $order['product_type'], $color, $order['quantity']);

        if ($stmt->execute()) {
            echo "Order moved to Inventory successfully";
        } else {
            echo "Error moving order to Inventory: " . $stmt->error;
        }
    } else {
        echo "Order not found.";
    }
}


// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['order_id']) && isset($_POST['new_status'])) {
        $orderId = $_POST['order_id'];
        $newStatus = $_POST['new_status'];
        updateOrderStatus($orderId, $newStatus);
    } else if (isset($_POST['order_id']) && isset($_POST['archive_status'])) {
        $orderId = $_POST['order_id'];
        $newStatus = $_POST['archive_status'];
        updateOrderArchiveStatus($orderId, $newStatus);
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

    // Remove the archive_status column from the JSON response
    $orders = array_map(function ($order) {
        unset($order['archive_status']);
        return $order;
    }, $orders);

    echo json_encode($orders);
}

$conn->close();
?>