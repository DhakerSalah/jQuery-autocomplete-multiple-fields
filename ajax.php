<?php
require_once 'config.php';

$fieldNo = !empty($_GET['fieldNo']) ? $_GET['fieldNo'] : '';
$name = !empty($_GET['name']) ? strtolower(trim($_GET['name'])) : '';

$fieldName = 'name';

switch ($fieldNo) {
    case 1:
        $fieldName = 'numcode';
        break;
    case 2:
        $fieldName = 'phonecode';
        break;
    case 3:
        $fieldName = 'iso3';
        break;
}

$data = array();
if (!empty($_GET['name'])) {
    $name = strtolower(trim($_GET['name']));
    $sql = "SELECT name, numcode, phonecode, iso3 FROM country where LOWER($fieldName) LIKE '" . $name . "%'";
    $result = mysqli_query($conn, $sql);
    while ($row = mysqli_fetch_assoc($result)) {
        $name = $row['name'] . '|' . $row['numcode'] . '|' . $row['phonecode'] . '|' . $row['iso3'];
        array_push($data, $name);
    }
}
echo json_encode($data);exit;
