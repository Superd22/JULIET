<?php
  require_once("getInvit.php");
  error_reporting(0);

  $eStart = $_REQUEST['eStart'];
  $eMod = $_REQUEST['eMod'];

  $all = false;

  if($user) {
    switch($eMod) {
      case "day":   $delta = 86400;   break;
      case "week":  $delta = 691200;  break;
      case "month": $delta = 22118400;  break;
      case "all": $all = true; break;
    }

    $events = array();
    if(!$all) $query = $mysqli->query("SELECT * FROM ju_events WHERE start >=".($eStart-$delta)." AND start <= ".($eStart+$delta)." AND del='0' ");
      else  $query = $mysqli->query("SELECT * FROM ju_events WHERE start >=".time()." AND del='0' LIMIT 20");

    echo $mysqli->error;
    while($event = $query->fetch_assoc()) {
      $try = ju_cal_invit_info_user($event['id']);

      foreach($try["EVENT"] as $pp => $v)
        $try[$pp] = $v;

      $events[] = $try;
    }

      print_r(json_encode($events));
  }
?>
