<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';  // Ensure this file contains the correct database connection setup

$type = isset($_GET['type']) ? $_GET['type'] : 'daily';
$metric = isset($_GET['metric']) ? $_GET['metric'] : 'speed';

$metric_column = "";
switch ($metric) {
    case 'speed':
        $metric_column = 'speed_column';
        break;
    case 'rpm':
        $metric_column = 'rpm_column';
        break;
    case 'temperature':
        $metric_column = 'temperature_column';
        break;
    case 'battery':
        $metric_column = 'battery_column';
        break;
    case 'fuel_level':
        $metric_column = 'fuel_level_column';
        break;
    case 'engine_temperature':
        $metric_column = 'engine_temperature_column';
        break;
    default:
        echo json_encode(['error' => 'Invalid metric parameter']);
        exit;
}

$sql = "";
if ($type === 'daily') {
    $sql = "SELECT DATE(date_column) AS date, SUM($metric_column) AS value FROM speedometer_data GROUP BY DATE(date_column)";
} elseif ($type === 'weekly') {
    $sql = "SELECT WEEK(date_column) AS week, SUM($metric_column) AS value FROM speedometer_data GROUP BY WEEK(date_column)";
} elseif ($type === 'monthly') {
    $sql = "SELECT MONTH(date_column) AS month, SUM($metric_column) AS value FROM speedometer_data GROUP BY MONTH(date_column)";
} else {
    echo json_encode(['error' => 'Invalid type parameter']);
    exit;
}

$result = $conn->query($sql);

$data = [
    'categories' => [],
    'values' => []
];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data['categories'][] = isset($row['date']) ? $row['date'] : (isset($row['week']) ? $row['week'] : $row['month']);
        $data['values'][] = $row['value'];
    }
} else {
    echo json_encode(['error' => 'No data found']);
    exit;
}

echo json_encode($data);
$conn->close();
?>
