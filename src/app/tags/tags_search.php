<?php
require_once("../inc/function.php");
error_reporting(-1);
	$mysqli = new_mysql_co();
	$i = 0;

	// PHPBB Session managment
	$phpbb_root_path = ('../../Forum/');
	define('IN_PHPBB', true);
	define('ROOT_PATH', "../../Forum/");

	if (!defined('IN_PHPBB') || !defined('ROOT_PATH')) {
	    exit();
	}

	$phpEx = "php";
	include($phpbb_root_path . 'common.' . $phpEx);

	$user->session_begin();
	$auth->acl($user->data);

	global $user;
	// PHPBB Session managment


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


	// Récupération de si oui où non on désire un membre en particulier
	$f = request_var("f","");
	$m = request_var("mod","");
	$d = file_get_contents('php://input');


	if($f == '' && $m == '' && $d != '') {
		$d = json_decode($d, true);
		$f = $d['f'];
		$m = $d['mod'];
	}
	$f = $mysqli->real_escape_string($f);
	// Récupération des T.A.G.S propres.
	$tag = $mysqli->query('SELECT * FROM star_tags WHERE name LIKE "%'.$f.'%" ORDER BY name DESC');
	while($list = $tag->fetch_assoc()) {
		$list['pretty_type'] = "Tag";
    $tags[] = $list;
	}

	if($m == "ALL") {
		$ranks = $mysqli->query("SELECT * FROM star_rank WHERE name LIKE '%".$f."%' ORDER BY name DESC");
		while($r = $ranks->fetch_assoc()) {
			$r["img"] = $r["url"];
			$r["id"] = $r["ID"];
			$r['type'] = 1;
			$r['pretty_type'] = "Rank";

			$tags[] = $r;
		}

		$ships = $mysqli->query("SELECT * FROM star_ship WHERE name LIKE '%".$f."%' ORDER BY name DESC");
		while($s = $ships->fetch_assoc()) {
			$s['img'] = $s['ico'];
			$s['type'] = 2;
			$s['pretty_type'] = "Ship";

			$tags[] = $s;
		}
	}



	$mysqli->close();
	print_r(json_encode(utf8ize($tags)));
?>
