<?php
session_start();

// Database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "messaging_system";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} else {
  // Get receiver ID and message from POST data
  $receiverId = $_POST['receiver_id'];
  $message = $_POST['message'];

  // Prepare and execute the SQL statement
  $sql = "INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)";
  $stmt = $conn->prepare($sql);

  // Bind parameters with correct data types
  $stmt->bind_param("iis", $_SESSION['user_id'], $receiverId, $message);

  if ($stmt->execute()) {
    echo "Message sent successfully";
  } else {
    echo "Error sending message: " . $conn->error;
  }

  // Close the statement and connection
  $stmt->close();
  $conn->close();
}
?>