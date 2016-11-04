<?php
  require_once("../inc/setup.inc.php");

  if($user) {
    $q = $mysqli->query("SELECT notif FROM star_fleet WHERE id_forum='".$user->data['user_id']."'");
    $r = $q->fetch_assoc();

    print_r($r["notif"]);
  }
?>
