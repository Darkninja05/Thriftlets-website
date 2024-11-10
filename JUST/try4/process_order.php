<?php
    // Database connection details (replace with your actual credentials)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "uniform_orders";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Process form data
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $names = $_POST['name'];
        $heights = $_POST['height'];
        $quantities = $_POST['quantity'];

        // Insert data into database
        for ($i = 0; $i < count($names); $i++) {
            $name = $names[$i];
            $height = $heights[$i];
            $quantity = $quantities[$i];

            $sql = "INSERT INTO orders (name, height, quantity) VALUES ('$name', $height, $quantity)";

            if ($conn->query($sql) === TRUE) {
                $success = true;
            } else {
                $error = "Error: " . $conn->error;
                $success = false;
            }
        }

        // Send response back to the client
        $response = array(
            'success' => $success,
            'error' => $error
        );

        header('Content-type: application/json');
        echo json_encode($response);
    }

    $conn->close();
?>