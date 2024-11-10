<?php
require '../configuration/config.php';

// Query to fetch data from the 'Inventory' table
$sql = "SELECT * FROM inventory";
$result = $conn->query($sql);

// Create an array to store the data
$data = array();

// Loop through the result set and add each row to the array
if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
    $data[] = $row;
  }
} else {
  echo "No data found.";
}

// Close the database connection
$conn->close();

// Encode the data as JSON and output it
header('Content-Type: application/json');
echo json_encode($data);
?>