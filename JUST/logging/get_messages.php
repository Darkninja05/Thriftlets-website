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
}

// Get user ID from query parameter
$userId = $_GET['user_id'];

// Fetch messages from the database
$sql = "SELECT m.*, u.username AS sender_username 
        FROM messages m 
        JOIN users u ON m.sender_id = u.id
        WHERE (m.sender_id = ? AND m.receiver_id = ?) OR (m.sender_id = ? AND m.receiver_id = ?) 
        ORDER BY m.timestamp ASC
        LIMIT 20";

$stmt = $conn->prepare($sql);
$stmt->bind_param("iiii", $userId, $_SESSION['user_id'], $_SESSION['user_id'], $userId);
$stmt->execute();
$result = $stmt->get_result();

// Store messages in an array
$messages = array();
while ($row = $result->fetch_assoc()) {
  // Determine the message type based on the current user's ID
  if ($row['sender_id'] === $_SESSION['user_id']) {
    // If the message is from the current user (sender)
    $row['message_type'] = 'sent'; // Use the 'sent' class
  } else {
    // If the message is from the selected user (receiver)
    $row['message_type'] = 'received'; // Use the 'received' class 
  }
  $messages[] = $row;
}

// Return messages as JSON data
header('Content-type: application/json');
echo json_encode($messages);

// Close connection
$conn->close();
?>