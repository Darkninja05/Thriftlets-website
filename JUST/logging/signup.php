<?php
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

// Get username, password, and admin key code from the form
$username = $_POST['username'];
$password = $_POST['password'];
$adminKeyCode = $_POST['admin_key_code']; // Get the admin key code

// Hash the password
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

// Prepare and execute the query
$user_type = "user"; // Default user type

// Prepare the SQL statement
$sql = "INSERT INTO users (username, password, user_type, key_code) VALUES (?, ?, ?, ?)";

// Prepare the statement
$stmt = $conn->prepare($sql);

// Bind the parameters
$stmt->bind_param("ssss", $username, $hashedPassword, $user_type, $adminKeyCode);

// Check if the admin key code is valid (you'll need to implement the validation logic)
if (isValidAdminKeyCode($adminKeyCode)) {
  $user_type = "admin"; // Set user type to "admin"
  $stmt->bind_param("ssss", $username, $hashedPassword, $user_type, $adminKeyCode); 
}

if ($stmt->execute()) {
  echo "Sign up successful! You can now log in.";
  echo "<script>window.location.href = 'index.html';</script>";
} else {
  echo "Error signing up: " . $conn->error;
}

$conn->close();

// Function to validate the admin key code (replace with your actual validation logic)
function isValidAdminKeyCode($adminKeyCode) {
  // Example validation: Check if the key code matches a predefined value
  $validKeyCode = "your_admin_key_code"; // Replace with the actual admin key code
  return $adminKeyCode === $validKeyCode;
}
?>