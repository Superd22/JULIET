<?php
require_once("../inc/function.php");
error_reporting(0);
	$mysqli = new_mysql_co();
	$i = 0;




function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}


	$query = $mysqli->query("SELECT name,id,ico FROM star_ship");
	while($ship = $query->fetch_assoc()) {
		$ships[] = $ship;
	}

	$mysqli->close();

	print_r(json_encode(utf8ize($ships)));
?>
