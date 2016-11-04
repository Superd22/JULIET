<?php
require_once("../inc/setup.inc.php");
require_once("../API/sendNotif.php");

	$i = 0;

	$userid = (integer) $_POST['user'];
	$mod = $_POST['mod'];

	// Si on veut le membre courant
	if($userid == 1 || !is_int($userid)) {
		$userid = $user->data['user_id'];
		}


		switch($mod) {
			case "add":
			$ship_id = (integer) $_POST['ship_id'];
				// Ajout du ship.
				$query = $mysqli->query("INSERT INTO star_ships
					(type_id,owner)
					VALUES ('".$ship_id."','".$userid."')
					");

				$query = $mysqli->query("SELECT MAX(Id) FROM star_ships");
				$last = $query->fetch_assoc();

				if(!$mysqli->error) {
					ju_send_notif(1,"ship","@u_".$user->data['user_id']." : nouveau vaisseau @vs_".$last['MAX(Id)']);
				}

				echo str_replace("\"", "",$last['MAX(Id)']);
			break;

			case "del":
				$ship_id = (integer) $_POST['ship_id'];
				// remove
				$query = $mysqli->query("DELETE FROM star_ships WHERE id='".$ship_id."' ");
				if(!$mysqli->error) {
					ju_send_notif(1,"ship","@u_".$user->data['user_id']." a supprimé le vaisseau @vs_".$ship_id);
				}
			break;

			case "rename":
				$ship_id = (integer) $_POST['ship_id'];
				$name = (string) $_POST['name'];

				$name = $mysqli->real_escape_string($name);
				$query = $mysqli->query("UPDATE star_ships SET name='".$name."' WHERE id='".$ship_id."'  ");
				if(!$mysqli->error)
					ju_send_notif(1,"ship","@u_".$user->data['user_id']." a changé le nom du @vs_".$ship_id);
				echo $mysqli->error;
			break;
		}

	$mysqli->close();
?>
