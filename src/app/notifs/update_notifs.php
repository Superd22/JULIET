<?php
  require_once("../inc/setup.inc.php");

  $userid = isset($_POST["user"]) ? $_POST["user"] : $user->data['user_id'];
  $target = isset($_POST['target']) ? (integer) $_POST['target'] : 0;
  $m = isset($_POST['m']) ? $_POST['m'] : true;
  $args = isset($_POST['args']) ? $_POST['args'] : false;

  if($user) {
    if($m === true) {
      $and = '';
      if($target != 0) $and = "AND id='".$target."'";
      $q = $mysqli->query("UPDATE star_notifs SET seen='1' WHERE dest='".$userid."' ".$and);
      echo json_encode($mysqli->error);
    }
    else {
      switch($m) {
        case "updateparam":
          if($args) {
            $args = $mysqli->real_escape_string($args);
            $q = $mysqli->query("UPDATE star_fleet SET notif='".$args."' WHERE id_forum='".$user->data['user_id']."'");
            echo json_encode($mysqli->error);
          }
        break;
      }
    }
  }

?>
