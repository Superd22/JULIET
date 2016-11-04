<?php
  require_once("../inc/setup.inc.php");

  $mod = $_POST['mod'];
  $rank = $_POST['rank'];
  if($user && $rank) {
    switch($mod) {
      case "del":
        if($rank["ID"] > 0) {
           $query = $mysqli->query("DELETE FROM star_rank WHERE ID='".$rank['ID']."'");
           echo $mysqli->error();
        }
      break;
      case "mod":
      if($rank['name'] && $rank['url'] && ($rank['stars'] || $rank['stars'] == 0) ) {
        echo "mod";
          if($rank['ID'] > 0) {
            echo "k";
            $query = $mysqli->query("UPDATE star_rank SET
              name = '".utf8_decode($rank['name'])."',
              url = '".$rank['url']."',
              type = '".$rank['type']."',
              pos = '".$rank['pos']."',
              stars = '".$rank['stars']."'

              WHERE ID = '".$rank['ID']."' ");

              echo $mysqli->error;
          }
          elseif($rank['ID'] < 0) {
            $query = $mysqli->query("INSERT INTO star_rank
              (name, url, type, pos, stars)
              VALUES ('".$rank['name']."', '".$rank['url']."', '".$rank['type']."', '".$rank['pos']."', '".$rank['stars']."') ");
          }

          echo $mysqli->error();
      }
      break;
    }
  }

 ?>
