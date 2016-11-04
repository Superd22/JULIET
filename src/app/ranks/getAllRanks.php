<?php
  require_once("../inc/setup.inc.php");

  if($user) {
    $return = array();

    for($i=0;$i<6;$i++) {

      $return[$i]["branches"][1]["id_STAR"] = $i;
      $return[$i]["branches"][2]["id_STAR"] = $i;
      $return[$i]["branches"][3]["id_STAR"] = $i;

      $return[$i]['branches'][1]['id_TYPE'] = 1;
      $return[$i]['branches'][2]['id_TYPE'] = 2;
      $return[$i]['branches'][3]['id_TYPE'] = 3;

      $return[$i]["branches"][1]['poses'][0]['ranks'] = array();
      $return[$i]["branches"][2]['poses'][0]['ranks'] = array();
      $return[$i]["branches"][3]['poses'][0]['ranks'] = array();
    }

    $ranks = $mysqli->query("SELECT * FROM star_rank");
      while($rank = $ranks->fetch_assoc()) {
        $rank['url_s'] = str_replace('.png', '_s.png', $rank['url']);
        $rank['name'] = utf8_encode($rank['name']);
        $return[$rank['stars']]['id_STAR'] = $rank['stars'];
        $return[$rank['stars']]['branches'][$rank['type']]['id_TYPE'] = $rank['type'];
        $return[$rank['stars']]['branches'][$rank['type']]['poses'][$rank['pos']]["id_POS"] = $rank['pos'];

        $return[$rank['stars']]['branches'][$rank['type']]['poses'][$rank['pos']]['ranks'][] = $rank;
      }

      header('Content-Type: text/json; charset=utf-8');
      print_r(json_encode($return,JSON_UNESCAPED_UNICODE));
  }

?>
