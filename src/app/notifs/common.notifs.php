<?php
function ju_parse_msg_notif($msg) {
  global $mysqli;

  if(mb_detect_encoding($msg, 'UTF-8', true)) $msg = utf8_decode($msg);
  $msg = str_replace('@u_0',"JULIET",$msg);
  preg_match_all("/\@u_(\d*?)/sU",$msg,$matches);
  foreach($matches[1] as $i=>$match) {
    if(!isset($name[$match])) {
      $pseudo = $mysqli->query("SELECT username FROM testfo_users WHERE user_id = '".$match."'");
      $psey = $pseudo->fetch_assoc();
      $name[$match] = $psey['username'];
    }

    $msg = str_replace($matches[0][$i],"<a href='https://starcitizen.fr/Flotte/?page=user&id=".$match."' class='pseudo_juliet'>".$name[$match]."</a>",$msg);
  }
  unset($matches);
  // Parsing escadron
  preg_match_all("/\@s_(\d*?)/sU",$msg,$matches);
  foreach($matches[1] as $i=>$match) {
    if(!isset($squads[$match])) {
      $pseudo = $mysqli->query("SELECT nom FROM star_squad WHERE id = '".$match."'");
      $psey = $pseudo->fetch_assoc();
      $squads[$match] = $psey['nom'];
    }

    $msg = str_replace($matches[0][$i],"<a href='https://starcitizen.fr/Flotte/?page=squad&m=view&id=".$match."' class='squad_juliet'>".$squads[$match]."</a>",$msg);
  }
  unset($matches);

  // Parsing grade
  preg_match_all("/\@r_(\d*?)/sU",$msg,$matches);
  foreach($matches[1] as $i=>$match) {
    if(!isset($grades[$match])) {
      $rank = $mysqli->query("SELECT name FROM star_rank WHERE ID = '".$match."'");
      $psey = $rank->fetch_assoc();
      $grades[$match] = $psey['name'];
    }
    $msg = str_replace($matches[0][$i],$grades[$match],$msg);
  }
  unset($matches);

  // Parsing TAG
  preg_match_all("/\@t_(\d*?)/sU",$msg,$matches);
  foreach($matches[1] as $i=>$match) {
    if(!isset($tags[$match])) {
      $dags = $mysqli->query("SELECT name FROM star_tags WHERE id = '".$match."'");
      $tag = $dags->fetch_assoc();
      $tags[$match] = $tag['name'];
    }

    $msg = str_replace($matches[0][$i],$tags[$match],$msg);
  }
  unset($matches);

  // Parsing event
  preg_match_all("/\@cal_(\d*?)/sU",$msg,$matches);
  foreach($matches[1] as $i=>$match) {
    if(!isset($cal[$match])) {
      $dags = $mysqli->query("SELECT title FROM ju_events WHERE id = '".$match."'");
      $tag = $dags->fetch_assoc();
      $cal[$match] = $tag['title'] != "" ? $tag['title'] : utf8_decode("un evenement supprimé");
    }

    $msg = str_replace($matches[0][$i],"<a href='https://starcitizen.fr/Flotte/?page=calendar#/view/".$match."'>".$cal[$match]."</a>",$msg);
  }

    // Parsing owner ship
    preg_match_all("/\@vs_(\d*?)/sU",$msg,$matches);
    foreach($matches[1] as $i=>$match) {
      if(!isset($ship[$match])) {
        $shipname = "";
        $dags = $mysqli->query("SELECT sc.name as TypeName, scs.name as ShipName
          FROM star_ship as sc, star_ships as scs
          WHERE sc.id = scs.type_id
          AND scs.id = '".$match."'
          ");
        $tag = $dags->fetch_assoc();
        if($tag['ShipName'] != '') $shipname = " : ".$tag['ShipName'];
        $ship[$match] = $tag['TypeName'] != "" ? $tag['TypeName'].$shipname : utf8_decode("Le vaisseau #".$match);
      }

      $msg = str_replace($matches[0][$i],"".$ship[$match]."",$msg);
    }

        // Parsing owner ship
      preg_match_all("/\@v_(\d*?)/sU",$msg,$matches);
        foreach($matches[1] as $i=>$match) {
          if(!isset($ship[$match])) {
            $dags = $mysqli->query("SELECT sc.name as TypeName
              FROM star_ship as sc
              WHERE sc.id = '".$match."'
              ");
            $tag = $dags->fetch_assoc();
            $ship[$match] = $tag['TypeName'] != "" ? $tag['TypeName'].$shipname : utf8_decode("Le vaisseau #".$match);
          }

          $msg = str_replace($matches[0][$i],"".$ship[$match]."",$msg);
        }


  return $msg;
}

?>
