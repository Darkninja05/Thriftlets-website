<?php
require '../configuration/config.php';

// SQL query to sum the quantities by product_Type
$sql = "SELECT product_Type, SUM(quantity) as total_quantity FROM Inventory GROUP BY product_Type";
$result = $conn->query($sql);

// Define the types and initialize them with 0
$data = [
    'Fabrics' => 0,
    'Threads' => 0,
    'Notions' => 0,
    'Tools' => 0
];

// Fetch data and store it in the $data array
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $productType = $row['product_Type'];
        if (array_key_exists($productType, $data)) {
            $data[$productType] = $row['total_quantity'];
        }
    }
}

// Output JSON so the JavaScript can easily use it
echo json_encode($data);

$conn->close();
?>
