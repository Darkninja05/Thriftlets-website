<?php
require '../configuration/config.php';

$sql = "SELECT label, value FROM chart_data";
$result = $conn->query($sql);

$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);

$conn->close();
?>
