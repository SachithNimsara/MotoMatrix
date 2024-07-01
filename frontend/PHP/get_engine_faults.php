<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require 'db.php'; // Assuming db.php contains your database connection logic

$sql = "SELECT id, code, description, date FROM engine_faults1";
$result = $conn->query($sql);

if ($result === false) {
    $error = array('error' => 'Database query error: ' . $conn->error);
    echo json_encode($error);
    exit;
}

$faults = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $faults[] = array(
            'id' => $row['id'],
            'code' => $row['code'],
            'description' => $row['description'],
            'date' => $row['date']
        );
    }
}

echo json_encode($faults);
$conn->close();
?>
