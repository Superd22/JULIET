<?php
  require_once("../inc/setup.inc.php");
  require_once("common.notifs.php");
  require_once("../inc/function.php");

  if($user) {
    $target = (request_var("target","") !== null && request_var("target","") != "") ? request_var("target","") : $user->data['user_id'];

    if(ju_is_admin($user->data['user_id']) || $target == $user->data['user_id']) {
      $q = $mysqli->query("SELECT * FROM star_notifs WHERE dest='".$target."' ORDER BY time DESC");

      $types = array();

      while($n = $q->fetch_assoc()) {
        $n["msg"] = ju_parse_msg_notif($n["msg"]);

        $qs[] = $n;
        if(!in_array($n['type'], $types)) $types[] = $n['type'];
      }

      $return = array(
        "NOTIFS" => $qs,
        "TYPES"  => $types
      );
      print_r(json_encode(utf8ize($return)));
    }
  }



?>
