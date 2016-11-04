<?php
  require_once("../inc/function.php");
  error_reporting(0);
  	$mysqli = new_mysql_co();
  	$i = 0;

    $test = $mysqli->query("SELECT id_forum,ships FROM star_fleet ORDER BY id ASC");
    while($do = $test->fetch_assoc()) {

      // On récupère les vaisseaux legacy.
      $ships = explode(',',$do['ships']);

      // On les ajoute à la nouvelle bdd
      foreach($ships as $ship) {
        if($ship > 0) $insert = $mysqli->query("INSERT INTO star_ships VALUES ('', '".$ship."','','".$do['id_forum']."')  ");
      }
    }
 ?>
