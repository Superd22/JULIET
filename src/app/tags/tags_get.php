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
	$_POST = json_decode(file_get_contents('php://input'), true);
	$userid = $_POST['user'];
	$shipid = $_POST['ship'];

	// Si on veut un ship.
	if($shipid > 0) $userid = 0;
	// Si on veut le membre courant
	if($userid == 1) $userid = $user->data['user_id'];

	// SI on veut récupérer uniquement les T.A.G.S de user
	$where = "";
	if($shipid > 0) {
		$where = "HAVING id in (SELECT tag_id FROM star_tags_af WHERE ship_id='".$userid."')";
	}
	elseif ($userid > 0) {
		$where = "HAVING id in (SELECT tag_id FROM star_tags_af WHERE user_id='".$userid."')";
	}
	// Récupération des T.A.G.S propres.
	$tag = $mysqli->query('SELECT * FROM star_tags '.$where.' ORDER BY ID DESC');
	while($list = $tag->fetch_assoc()) {

		$list['count'] = 0;
		$list['client_id'] = $i;
		$ct = $mysqli->query('SELECT COUNT(*) FROM star_tags_af WHERE tag_id = "'.$list['id'].'" ');
		$ct = $ct->fetch_assoc();

		$list['count'] = $ct["COUNT(*)"];
		if($list['count'] > 0) {
			$tags[$i] = $list;
			$i++;
		}
	}


	$where1 = $where2 = '';
	if($userid > 0) {
		$where1 = "WHERE id IN (SELECT type_id FROM star_ships WHERE owner='".$userid."')";
		$where2 = "WHERE ID IN (SELECT grade FROM star_fleet WHERE id_forum='".$userid."')";
	}

	if(!$shipid) {
		// Récupération de tous le reste
			// Ships maj becoze lol
		$ships = $mysqli->query('SELECT id,name,ico FROM star_ship '.$where1);
		echo $mysqli->error;

			while($ship = $ships->fetch_assoc()) {
				$oneship = array("id" => $ship['id'],"name" => $ship['name'],"img" => $ship['ico'], "client_id"=>$i ,"type" =>"ship");

				$dada = $mysqli->query('SELECT COUNT(*) FROM star_fleet WHERE FIND_IN_SET("'.$oneship['id'].'", ships)');
				$ct = $dada->fetch_assoc();

				$oneship['count'] = $ct["COUNT(*)"];

				$tags[$i] = $oneship;
				$i++;
			}

			// Ranks/Grade
		$ranks = $mysqli->query('SELECT ID, name, url FROM star_rank '.$where2);
		$theRanks = array();
			while ($rank = $ranks->fetch_assoc()) {
				$onerank = array("id" => $rank['ID'], "name" => utf8_encode($rank['name']), "client_id" => $i, "img" => utf8_encode($rank['url']), "type" => "rank");

				$count = $mysqli->query('SELECT COUNT(*) FROM star_fleet WHERE grade="'.$rank['ID'].'"');
				$ct = $count->fetch_assoc();

				$onerank['count'] = $ct['COUNT(*)'];
				$tags[$i] = $onerank;
				$i++;
			}
		}
	$mysqli->close();
	print_r(json_encode(utf8ize($tags)));
?>
