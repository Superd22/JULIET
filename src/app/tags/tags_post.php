<?php
error_reporting(0);
require_once("../inc/setup.inc.php");
require_once("../API/sendNotif.php");
// Posting TAGS to mysql

$errors = array();
$data = array();
$message = "Ok!";

$method = $_POST['method'];

function add_tag_to_user($tagid,$userid) {
	global $user, $mysqli;

	$send = $mysqli->query("INSERT INTO star_tags_af (tag_id, user_id)
				VALUES('".$tagid."','".$userid."')");

	$msg_perso = "Vous avez maintenant le T.A.G @t_".$tagid.".";
	$msg_ju = "@u_".$user->data['user_id']." a rajouté le T.A.G @t_".$tagid." à @u_".$userid;
	if($user->data['user_id'] != $userid) $msg_perso .= "(Ajouté par @u_".$user->data['user_id'].")";

	if(!$mysqli->error)  {
		ju_send_notif($userid,"tag",$msg_perso);
		ju_send_notif(1,"tag",$msg_ju);
	}

	return $send;
}

function remove_tag_to_user($tagid,$userid) {
	global $user, $mysqli;

	$send = $mysqli->query("DELETE FROM star_tags_af WHERE tag_id='".$tagid."' AND user_id='".$userid."'");
	$msg_perso = "Vous n'avez plus le T.A.G @t_".$tagid.".";
	$msg_ju = "@u_".$user->data['user_id']." a supprimé le T.A.G @t_".$tagid." à @u_".$userid;
	if($user->data['user_id'] != $userid) $msg_perso .= "(Retiré par @u_".$user->data['user_id'].")";



	if(!$mysqli->error)  {
		ju_send_notif($userid,"tag",$msg_perso);
		ju_send_notif(1,"tag",$msg_ju);
	}

	return $send;
}

	// Global error check
	if ($method == "update" && empty($_POST['id'])) $errors['id'] = "Vous devez spécifier un Tag à mettre à jour.";

	// Handlers
	if(!empty($method) && empty($errors)) {
			if($_POST['user'] > 0) {
				if ($_POST['user'] == 1) $uid = $user->data['user_id'];
				else $uid = $_POST['user'];
			}

		switch($method) {
			case 'new' :
				if (empty($_POST['title'])) $errors['title'] = "Un Tag doit avoir un nom.";
				// Nouveau TAG.
				$title = $mysqli->real_escape_string($_POST['title']);
				$img = $mysqli->real_escape_string($_POST['img']);

				// Verification nom du tag.
				$insert = $mysqli->query("INSERT INTO star_tags (name, img)
					VALUES('".$title."','".$img."')");
					if(!empty($mysqli->error)) $errors['main'] = "Soucis BDD, ".$mysqli->error;

				if( $uid > 0 ) {
					$select = $mysqli->query("SELECT id FROM star_tags WHERE name='".$title."'");
					$id = $select->fetch_assoc();

					add_tag_to_user($id['id'],$uid);
				}

				$mysqli->close();
			break;

			case 'remove_af' :
				(int) $tid = $_POST['tag_id'];
				if(!remove_tag_to_user($tid,$uid)) $errors['main'] = "Impossible de supprimer l'affectation";
			break;
		}
	}


	// Return values
	if(!empty($errors)) {
		$data['sucess'] = false;
		$data['errors'] = $errors;
	} else {
		$data['sucess'] = true;
		$data['message'] = $message;
	}

	print_r(json_encode($data));


?>
