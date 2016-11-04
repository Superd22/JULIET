<?php
  require_once("../inc/setup.inc.php");
  require_once("../Rights/helper/Main.php");
  require_once("helpers.php");

  if($user && JULIET\Rights\helper\Main::is_sibylla()) {
    header('Content-type: application/json; charset=UTF-8');
    print_r(json_encode(JULIET\Calendar\helper\Hash::hash_player($user->data['user_id'])));
  }
?>
