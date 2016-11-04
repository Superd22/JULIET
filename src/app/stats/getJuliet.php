<?php
function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}

  include('../inc/mysql.inc.php');
  error_reporting(0);
  $mysqli = new_mysql_co();

  $players = $mysqli->query("SELECT id_forum,fleet,handle,squad FROM star_fleet WHERE pending='0'");
$guild = array();
    while($player = $players->fetch_assoc()) {
      if (!($guild[$player['squad']] > 0)) $guild[$player['squad']] = 0;

      if(!$guild[$player['squad']]) {
        $lol = $mysqli->query("SELECT nom FROM star_squad WHERE id='".$player['squad']."' LIMIT 1");
        $guild[$player['squad']] = $lol->fetch_assoc();
        }

      $player["squadname"] = ($guild[$player['squad']]["nom"] == null ? "Z.Nope" : $guild[$player['squad']]["nom"]);
      $members[$player["id_forum"]] = $player;
    }
  echo json_encode(utf8ize($members));
?>
