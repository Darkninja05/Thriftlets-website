<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "bargraph_data";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch supplier data
$sql = "SELECT * FROM suppliers";
$result = $conn->query($sql);

$suppliers = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $suppliers[] = $row;
    }
} else {
    echo "0 results";
}

// Return data as JSON
header('Content-Type: application/json');
echo json_encode(['suppliers' => $suppliers]);

$conn->close();
?>