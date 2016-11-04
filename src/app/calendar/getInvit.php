<?php
  require_once("../inc/setup.inc.php");
  require_once("helpers.php");
  if(isset($_POST['eId'])) $eId = (int) $_POST['eId'];
  $can = $asked = $isIn = false;

  function ju_cal_invit_info_user($eId) {
    return \JULIET\Calendar\helper\aSummary::get_summary($eId);
  }

    if($user && isset($eId)) {
      $search = ju_cal_invit_info_user($eId);
      print_r(json_encode($search));
    }
?>
