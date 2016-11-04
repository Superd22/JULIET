<?php
  require_once("../inc/setup.inc.php");
  error_reporting(0);


    $eId = (integer) $_POST['eId'];
    $mod = $_POST['mod'];

    $event = $_POST['eventInfo'];
    if($user) {
      $title = $mysqli->real_escape_string($event['title']);
      $text = $mysqli->real_escape_string($event['text']);
      $private = (integer) $event['private'];
      $start = (integer) $event['start'];
      $end = (integer) $event['end'];
      $max = (integer) $event['membersMax'];
      $topic = (integer) $event['topic'];
      $perm = implode(',',$event['perm']);
      switch($mod) {
        case "MAIN_EDIT":
        if($eId > 0) {
          $try = $mysqli->query("UPDATE ju_events SET
          title='".$title."',
          text='".$text."',
          private='".$private."',
          start='".$start."',
          end='".$end."',
          perm='".$perm."',
          membersMax='".$max."',
          topic='".$topic."'
          WHERE id='".$eId."' ");
          if($try) echo "OK";
        }
        break;
        case "ADD_EVENT":
          $try = $mysqli->query("INSERT INTO ju_events
            (title, text, private, start, end, perm, author, membersMax, topic)
            VALUES (
              '".$title."',
              '".$text."',
              '".$private."',
              '".$start."',
              '".$end."',
              '".$perm."',
              '".$user->data['user_id']."',
              '".$max."',
              '".$topic."'
            )");
            echo $mysqli->error;
            if($try) {
              echo $mysqli->insert_id;
            }
        break;
        case "DEL_EVENT":
          $try = $mysqli->query("UPDATE ju_events SET del='1' WHERE id='".$eId."'");
        break;
      }
    }

 ?>
