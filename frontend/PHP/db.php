<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "obd_data";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error===true) {
    die("Connection failed: " . $conn->connect_error);
}
?>
