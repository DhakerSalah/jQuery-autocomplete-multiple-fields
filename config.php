<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'ds_autocomplete');
define('DB_USER', 'root');
define('DB_PASSWORD', '');

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}  