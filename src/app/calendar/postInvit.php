<?php
  require_once("../inc/setup.inc.php");
  require_once("../API/sendNotif.php");
  $mod = $_POST['mod'];
  $eId = (integer) $_POST['eId'];
  $target = (integer) $_POST['target'];
  if($target == 0) $target = $user->data['user_id'];
  $type = (integer) $_POST['type'];
  $name = (string) $_POST['tagName'];
  $confirm = (integer) $_POST['confirm'] || 0;
  $prefix = "@t_";

    if($user && $mod && $target && $eId) {
      if($name != '') {
        switch($type+100) {
          case 0:
            $prefix = "@t_";
            $tagType = "tag";
          break;
          case 1:
            $prefix = "@r_";
            $tagType = "rank";
          break;
          case 2:
            $prefix = "@v_";
            $tagType = "ship";
          break;
        }

        require_once("../Tags/tags_get_single.php");
        unset($g);
        $g = tags_get_single($name,$tagType);

        unset($b);
        $b = array();
        foreach($g["count"] as $d) {
          $b[] = $d['id_forum'];
        }
      }

      switch($mod) {
        case "DEL_INVIT":
          $try = $mysqli->query("DELETE FROM ju_events_invit WHERE target='".$target."' AND id_event='".$eId."' AND type !='2' ");
          if(!$mysqli->error) {
            ju_send_notif($target,"calendar","@u_".$user->data['user_id']." a supprimé votre invitation à @cal_".$eId);
            ju_send_notif(1,"calendar","@u_".$user->data['user_id']." a supprimé l'invitation de @u_".$target." à @cal_".$eId);
          }
        break;
        case "DEL_GRP":
          $try = $mysqli->query("DELETE FROM ju_events_invit WHERE target='".$target."' AND id_event='".$eId."' AND type=2 ");
            ju_send_notif(1,"calendar","@u_".$user->data['user_id']." a suprimmé @s_".$target." de @cal_".$eId);
            ju_send_notif($target,"calendar","@u_".$user->data['user_id']." a supprimé l'invitation de @s_".$target." à @cal_".$eId, true);
        break;
        case "DEL_TAG":
        $try = $mysqli->query("DELETE FROM ju_events_invit WHERE target='".$target."' AND id_event='".$eId."' AND type='".$type."' ");
          ju_send_notif($b,"calendar","@u_".$user->data['user_id']." a supprimé l'invitation du tag ".$prefix.$target." à @cal_".$eId);
        break;
        case "ADD_INVIT":
          $try = $mysqli->query("INSERT INTO ju_events_invit (id_event, confirm, type, target)
          VALUES (
            '".$eId."',
            '".(integer) $confirm."',
            '".$type."',
            '".$target."'
          )");
          if(!$mysqli->error) {
            if($type > 0) {
              ju_send_notif(1,"calendar","@u_".$user->data['user_id']." a invité @u_".$target." à @cal_".$eId);
              if($type == 2)
                ju_send_notif($target,"calendar","@u_".$user->data['user_id']." a invité @s_".$target." à @cal_".$eId, true);
              else
                ju_send_notif($target,"calendar","@u_".$user->data['user_id']." vous a invité à @cal_".$eId);
            }
            else {
              ju_send_notif($b,"calendar","@u_".$user->data['user_id']." a invité les posseseurs du tag ".$prefix.$target." à @cal_".$eId);
            }
          }
        break;
        case "CONFIRM_INVIT":
          $try = $mysqli->query("UPDATE ju_events_invit SET confirm='1' WHERE id_event='".$eId."' AND target='".$target."' AND type != '2'");
          if(!$mysqli->error) {
            ju_send_notif($target,"calendar","@u_".$user->data['user_id']." a confirmé sa participation à @cal_".$eId);
            ju_send_notif(1,"calendar","@u_".$user->data['user_id']."  a confirmé la participation de @u_".$target." à @cal_".$eId);
          }
        break;
        case "UP_MY_INV":
          $try = $mysqli->query("UPDATE ju_events_invit SET confirm='".$confirm."' WHERE id_event='".$eId."' AND target='".$target."' AND type != '2'");
          if(!$mysqli->error) {
            ju_send_notif($target,"calendar","@u_".$user->data['user_id']." a mis à jour sa participation à @cal_".$eId);
            ju_send_notif(1,"calendar","@u_".$user->data['user_id']."  a mis à jour la participation de @u_".$target." à @cal_".$eId);
          }
        break;

        break;
      }

        if($try) echo json_encode("OK");
        else echo json_encode($mysqli->error);
    }
?>
