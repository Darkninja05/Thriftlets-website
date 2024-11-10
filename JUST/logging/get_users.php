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

// Check if user is logged in
if (isset($_SESSION['user_id'])) {
  // Get the current user's type and key_code
  $sql = "SELECT user_type, key_code FROM users WHERE id = ?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param("i", $_SESSION['user_id']);
  $stmt->execute();
  $result = $stmt->get_result();
  $currentUser = $result->fetch_assoc();

  if ($currentUser) {
    $currentUserType = $currentUser['user_type'];
    $currentUserKeyCode = $currentUser['key_code'];   

    // Fetch users based on the current user's type and key_code
    if ($currentUserType == 'admin') {
      // Admin: Show only 'user' type users with the same key_code
      $sql = "SELECT id, username FROM users WHERE user_type = 'user' AND key_code = ? AND id != ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("si", $currentUserKeyCode, $_SESSION['user_id']);
    } else if ($currentUserType == 'user') {
      // User: Show only 'admin' type users with the same key_code
      $sql = "SELECT id, username FROM users WHERE user_type = 'admin' AND key_code = ? AND id != ?";
      $stmt = $conn->prepare($sql);
      $stmt->bind_param("si", $currentUserKeyCode, $_SESSION['user_id']);
    } else {
      // Unknown user type, redirect to login page
      echo "<script>window.location.href = 'index.html';</script>";
      exit();
    }

    // Execute the query
    $stmt->execute();
    $result = $stmt->get_result();

    // Store users in an array
    $users = array();
    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }

    // Return users as JSON data
    header('Content-type: application/json');
    echo json_encode($users);
  } else {
    // If no current user is found in the database, redirect to login
    echo "<script>window.location.href = 'index.html';</script>";
  }
} else {
  // User is not logged in, redirect to login page
  echo "<script>window.location.href = 'index.html';</script>";
}

$conn->close();
?>
