<?php
  require_once("../inc/setup.inc.php");

  $uid = $user->data["user_id"];
  if($uid > 0) {
    $rank = $mysqli->query("SELECT * FROM star_rank WHERE id =
      (SELECT grade FROM star_fleet WHERE id_forum='".$uid."') LIMIT 1");

    $urank = $rank->fetch_assoc();
    $urank['url_s'] = str_replace(".png", "_s.png", $urank['url']);

    

    print_r(json_encode($urank));
  }

?>
