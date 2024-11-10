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

// Get username and password from the form
$username = $_POST['username'];
$password = $_POST['password'];

// Prepare and execute the query
$sql = "SELECT id, password FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

// Check if user exists
if ($result->num_rows > 0) {
  // Fetch user data
  $row = $result->fetch_assoc();
  $hashedPassword = $row['password'];

  // Verify password
  if (password_verify($password, $hashedPassword)) {
    // Store user ID in session variable
    $_SESSION['user_id'] = $row['id'];
    $_SESSION['username'] = $username; // Store username in session
    $_SESSION["user_type"] = $row["user_type"];

    // Set login status in localStorage
    echo "<script>localStorage.setItem('loggedIn', 'true');</script>";
    echo "<script>localStorage.setItem('username', '$username');</script>"; // Store username in localStorage
    echo "<script>window.location.href = 'index.html';</script>";
  } else {
    echo "Incorrect password.";
  }
} else {
  echo "User not found.";
}

$conn->close();
?>