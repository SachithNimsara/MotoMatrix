<?php
include 'db.php';

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$sql = "SELECT * FROM error_prevent1 ORDER BY id DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        'date' => $row['date'],
        'threats' => $row['threats'],
        'title' => $row['title'],
        'issue_what' => $row['what'],
        'issue_action' => $row['action']
    ]);
} else {
    echo json_encode([]);
}
$conn->close();
?>
