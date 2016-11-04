<?php
require_once("../inc/setup.inc.php");

  $atId = $_REQUEST['id'];
  $acat = $_REQUEST['type'];


  if(!is_array($atId)) $atId = array(0 => $atId);
  if(!is_array($acat)) $acat = array(0 => $acat);

  $tags = array();

foreach($atId as $i => $tId) {
  $cat = $acat[$i];
  if($cat < 0) $cat += 100;
  if($user && $tId > 0 && $cat >= 0) {
      if($cat == 0) {
        $q = $mysqli->query("SELECT name,img FROM star_tags WHERE id='".$tId."'");
        $tag = $q->fetch_assoc();
        $tag["id"] = $tId;
        $tag["type"] = $cat;
        $tags[] = $tag;
      }
      elseif($cat == 1) {
        $q = $mysqli->query("SELECT name,url FROM star_rank WHERE ID='".$tId."'");
        $tag = $q->fetch_assoc();
        $tag['img'] = $tag['url'];
        $tag["id"] = $tId;
        $tag["type"] = $cat;
        $tags[] = $tag;
      }
      elseif($cat == 2) {
        $q = $mysqli->query("SELECT name,ico FROM star_ship WHERE id='".$tId."'");
        $tag = $q->fetch_assoc();
        $tag['img'] = $tag['ico'];
        $tag["id"] = $tId;
        $tag["type"] = $cat;
        $tags[] = $tag;
      }
    }
}
  if(!isset($tags[1])) $tags = isset($tags[0]) ? $tags[0] : null;
  print_r(json_encode(utf8ize($tags)));

?>
