<?php
  require_once("../inc/setup.inc.php");

  $eId = $_POST['eId'];

  if($user && $eId > 0) {
    $event = $grps = $membrs = $rsvp = $tags = array();

    $query = $mysqli->query("SELECT * FROM ju_events WHERE id ='".$eId."' AND del='0' LIMIT 1");
    $event["Event"] = $query->fetch_assoc();
    $event["Event"]["perm"] = (array) explode(",",$event["Event"]["perm"]);
    foreach($event["Event"]["perm"] as $key=>$perm) {
      if($perm == "") unset($event["Event"]["perm"][$key]);
    }

    $event["Event"]["membersMax"] = (integer)  $event["Event"]["membersMax"];

    $event["Event"]["perm"] = array_values($event["Event"]["perm"]);

    $invits = $mysqli->query("SELECT * FROM ju_events_invit WHERE id_event='".$eId."'");
    while($invit = $invits->fetch_assoc()) {
      if($invit['type'] < 0) $tags[] = $invit;
      elseif($invit['type'] == 2) $grps[] = $invit;
      elseif($invit['confirm'] > 0) $membrs[] = $invit;
      else $rsvp[] = $invit;
    }

    $event["Invitations"]['groupes'] = $grps;
    $event["Invitations"]['members'] = $membrs;
    $event["Invitations"]['invits'] = $rsvp;
    $event["Invitations"]['tags'] = $tags;


      print_r(json_encode($event));

  }
?>
