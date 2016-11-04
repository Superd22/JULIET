<?php
    require_once("../inc/setup.inc.php");
    require_once("tags_get_single.php");

    $mysqli = new_mysql_co();
    $query = $_REQUEST['query'];
    $not = "";
    $sql_user = 'SELECT id,id_forum FROM star_fleet WHERE ';
    $sql_ship = 'SELECT * FROM star_ships WHERE ';
    $prev = null;
    $INFOS_USERS = $INFOS_SHIPS = array();

    //error_reporting(-1);
    $result = array('ERROR' => array(), 'LISTS' => array());
    if($query) {
      foreach($query as $i=>$q) {
        $prev = "SYMBOL";
          // S'il s'agit d'un ! on inverse, sinon on ajoute juste le symbole.
        if($q['type'] == "SYMBOL" && $q['symbol'] == '!') {$not = "NOT";}
        else if($q['type'] == "SYMBOL") {$sql_user .= $q['symbol']; $sql_ship .= $q['symbol'];}

          // S'il s'agit d'un tag on récup les IDS.
        if($q['type'] != "SYMBOL") {
          $tempTag = $tempIds = $tempsShipIds = $ids = null;
            // Selon le type de tag
          switch($q['type']) {
            case '0':       $tempTag = tags_get_single($q['name'],"tag",true);      break;
            case '1':       $tempTag = tags_get_single($q['name'],"rank");          break;
            case '2':       $tempTag = tags_get_single($q['name'],"ship",true);     break;
            case 'SPECIAL': $tempTag = tags_get_single($q['name'],"SPECIAL",true);  break;
          }
          $INFOS_USERS = $INFOS_USERS + $tempTag['INFO']['count'];
          $INFOS_SHIPS = $INFOS_SHIPS + $tempTag['INFO']['SHIP_COUNT'];

            // On a récupéré les membres ayant le tempTag
          foreach($tempTag['count'] as $m) {
            $tempIds[] = $m['id_forum'];
          }

            // On récupère tous les vaisseaux ayant le tempTag.
          foreach($tempTag['SHIP_COUNT'] as $m) {
            $tempsShipIds[] = $m['id'];
          }

            // Verification AND
          if( (is_numeric($query[($i-1)]['type'])) || $query[($i-1)]['type'] == "SPECIAL" || $query[($i-1)]['SYMBOL'] == ")" || $query[($i-1)]['SYMBOL'] == "NOT" ) {$sql_user .= " AND ";$sql_ship .= " AND ";}
          $prev = "tag";

            // Et on finit la query.
          $ids = implode("','",$tempIds);
          $shipIds = implode("','",$tempsShipIds);
          $sql_user .= " id_forum ".$not." IN ('".$ids."') ";
          $sql_ship .= " id ".$not." IN ('".$shipIds."') ";

          $not = "";
        }
      }


        $q = $mysqli->query($sql_user);
        if($mysqli->error) $result['ERROR'][] = $mysqli->error;
        if(is_object($q)) {
          while($user = $q->fetch_assoc()) {
            $user['avatar'] = $INFOS_USERS[$user['id_forum']]['avatar'];
            $user['name'] = $INFOS_USERS[$user['id_forum']]['name'];
            $user['fleet'] = $INFOS_USERS[$user['id_forum']]['fleet'];

            $result['LISTS']['USERS'][] = $user;
          }}

        $s = $mysqli->query($sql_ship);
        if($mysqli->error) $result['ERROR'][] = $mysqli->error;
        if(is_object($s)) {
          while($ship = $s->fetch_assoc()) {
            $ship['img'] = $INFOS_SHIPS[$ship['id']]['img'];
            $ship['type'] = $INFOS_SHIPS[$ship['id']]['ship_type'];
            $ship['owner_name'] = $INFOS_SHIPS[$ship['id']]['owner_name'];
            $result['LISTS']['SHIPS'][] = $ship;
          }
        }
      }

      $result['QUERIES']['ships'] = $sql_ship;
      $result['QUERIES']['users'] = $sql_user;

      print_r(json_encode(utf8ize($result)));


?>
