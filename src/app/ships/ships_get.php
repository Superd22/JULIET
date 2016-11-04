<?php
error_reporting(0);
require_once("../inc/function.php");
	$mysqli = new_mysql_co();
	$i = 0;




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

	$_POST = json_decode(file_get_contents('php://input'), true);


		// Si on a demandé un groupe, et uniquement dans ce cas, on typecast l'id.
			// (Failsafe pour le hangar de toute la flotte.)
	$userid = (integer) $_POST['user'];
	if(isset($_POST['group'])) $groupid = (integer) $_POST['group'];
	$affect = (boolean) $_POST['affect'];


		// Si on veut le membre courant
	if($userid == 1 || !is_int($userid)) {
		$userid = $user->data['user_id'];
		}

		// Pour un user particulier
	$sql_in = "WHERE owner = '".$userid."'";
		// Pour l'esemble de la flotte
	if($groupid === 0) $sql_in = "";
		// Pour les vaisseaux des membres du groupe.
	else if($groupid && !$affect) $sql_in = "WHERE FIND_IN_SET(owner, (SELECT members FROM star_squad WHERE id = '".$groupid."'))";


	$query = $mysqli->query("SELECT * FROM star_ships ".$sql_in);
	echo $mysqli->error;
	while($ship = $query->fetch_assoc()) {

		// Cache du detail des différents vaisseaux.
		if(!is_array($ships_details[$ship['type_id']])) {
			$details = $mysqli->query("SELECT * FROM star_ship WHERE id='".$ship['type_id']."'");
			$detail = $details->fetch_assoc();

			ini_set('user_agent','Mozilla/4.0 (compatible; MSIE 7.0b; Windows NT 6.0)');
			list($width) = getimagesize($detail['ico']);
			$ships_details[$ship['type_id']] = $detail;
			$ships_details[$ship['type_id']]['size'] = $width;
		}

		$ships[$ship['id']] = $ship;
	}

	$mysqli->close();


	// FIX TODO FIND BETTER
		// (JS can't order Objects for some reason.)
	if(isset($groupid)) {
		foreach ($ships as $row) {
    $shipd[] = $row;
		}

		$ships = $shipd;
	}


	print_r(json_encode(utf8ize(array("owned" => $ships, "details" => $ships_details))));
?>
