<?php
   // Database connection settings (replace with your actual settings)
   require '../../configuration/config.php';

   // Check if data is sent via POST
   if ($_SERVER['REQUEST_METHOD'] === 'POST') {
       $data = json_decode(file_get_contents('php://input'), true);

       // Sanitize user input (important for security)
       $supplier = intval($data['supplier']);
       $product = intval($data['product']);
       $productType = $conn->real_escape_string($data['productType']);
       $color = $conn->real_escape_string($data['color']); // Sanitize color
       $quantity = intval($data['quantity']);
       $totalPrice = floatval($data['totalPrice']);
       $address = $conn->real_escape_string($data['address']);
       $paymentMethod = $conn->real_escape_string($data['paymentMethod']);

       // Insert into the database
       $stmt = $conn->prepare("INSERT INTO orders (supplier_id, product_id, product_type, color, quantity, total_price, address, payment_method, order_status, archive_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?,'Process', 'Unarchived')");
       $stmt->bind_param("iiisdiis", $supplier, $product, $productType, $color, $quantity, $totalPrice, $address, $paymentMethod);

       if ($stmt->execute()) {
           echo json_encode(['success' => true, 'message' => 'Order placed successfully']);
       } else {
           echo json_encode(['success' => false, 'message' => 'Failed to place order']);
       }

       $stmt->close();
   }

   $conn->close();
   ?>