<?php
require_once("../inc/functions_user.php");

//	tags_get_single()
//	Retourne un tag et les joueurs qui le possèdent
//	(string) name : Nom du tag en question
// 	(string) cat : Catégorie du tag (tag | ship | rank | SPECIAL)
//	(bool) all : Si on cherche juste les joueurs où toutes les resssources de ce tag.
function tags_get_single($name,$cat,$all = FALSE) {
	global $mysqli;
		switch($cat) {
			case "tag" :

				// Si le tag qu'on cherche est un TAG banal.
				$tags = $mysqli->query('SELECT * FROM star_tags WHERE name="'.$mysqli->real_escape_string($name).'"');
					$tag = $tags->fetch_assoc();

						// Récupération des joueurs qui possèdent le tags.
					$players = $mysqli->query("SELECT id,id_forum,fleet FROM star_fleet,star_tags_af WHERE tag_id='{$tag['id']}' AND user_id = id_forum");
					while($player = $players->fetch_assoc()) {
							// Formatage Avatar/Nom forum et ajout dans le count.
						$player['avatar'] = ju_get_avatar($player['id_forum']);
						$player['name'] = get_names($player['id_forum']);

						$tag['INFO']['count'][$player['id_forum']] = $player;
						$tag['count'][] = $player;
					}

						// Si on cherche toutes les ressources et pas juste les joueurs.
					if($all) {
							// On récupère les vaisseaux qui possèdent ce tag.
						$ships = $mysqli->query("SELECT * FROM star_ships HAVING id IN (SELECT ship_id FROM star_tags_af WHERE tag_id='".$tag['id']."')");
						while($s = $ships->fetch_assoc()) {
							$tag['INFO']['SHIP_COUNT'][$s['id']] = $s;
							$tag['SHIP_COUNT'][] = $s;
						}

							// TO DO OTHER ressources
						$tag['RESS_COUNT'] = array();
					}

					$ZeTag = $tag;
			break;

			case "ship":
				// Récupération ship.
				$ships = $mysqli->query('SELECT * FROM star_ship WHERE name="'.$name.'"');
				$ship = $ships->fetch_assoc();

					// Construction du "TAG" afférant au vaisseau
				$oneship = array("id" => $ship['id'],"name" => $ship['name'],"img" => $ship['ico'],"type" =>"ship");

					// Récupération des vaisseaux enfants.
				$allShips = array($oneship);
				$children = $mysqli->query('SELECT * FROM star_ship WHERE parent="'.$ship['id'].'"');
				while($child = $children->fetch_assoc()) {
					$oneship['hasChildren'] = true;
					$allShips[] = $child;
				}

				foreach($allShips as $ship) {
						// Récupération des joueurs qui possèdent ce vaisseau.
					$players = $mysqli->query('SELECT id,id_forum,fleet FROM star_fleet WHERE id_forum IN
							(SELECT owner FROM star_ships WHERE type_id = "'.$ship['id'].'")');
						while($player = $players->fetch_assoc()) {
							if($player['id_forum'] > 0) {
									// Formattage.
								$player['avatar'] = ju_get_avatar($player['id_forum']);
								$player['ship_type'] = $ship['name'];
								$player['name'] = utf8_encode(get_names($player['id_forum']));
								$oneship['count'][$player['id_forum']] = $player;

									// envoie info pour uniquement le papa.
								if($ship['id'] == $oneship['id']) $oneship['OWN_count'][] = $player;
							}
						}

						// Si on veut toutes les ressources.
					if($all) {
							// Récupération vaisseaux.
						$shipsB = $mysqli->query("SELECT * FROM star_ships WHERE type_id='".$ship['id']."'");
						while($s = $shipsB->fetch_assoc()) {
								$s['ship_type'] = $ship['name'];
								$s['img'] = $ship['ico'] != '' ? $ship['ico'] : $oneship['img'];
								$s['owner_name'] = utf8_encode(get_names($s['owner']));

								$oneship['INFO']['SHIP_COUNT'][$s['id']] = $s;
								$oneship['SHIP_COUNT'][] = $s;
						}

						// TO DO RECUPERATION RESSOURCES.
					}

				}
				// FIX Angular arrays.
				$oneship['INFO']['count'] = $oneship['count'];
				$oneship['count'] = array_values($oneship['count']);
				$ZeTag = $oneship;
			break;

			case "rank":
				$ranks = $mysqli->query('SELECT ID, name, url FROM star_rank WHERE name="'.$name.'"');
				$rank = $ranks->fetch_assoc();
				$onerank = array("id" => $rank['ID'], "name" => utf8_encode($rank['name']), "img" => utf8_encode($rank['url']), "type" => "rank");

					$players = $mysqli->query('SELECT id,id_forum,fleet FROM star_fleet WHERE grade="'.$rank['ID'].'"');
					while($player = $players->fetch_assoc()) {
						if($player['id_forum'] > 0) {
							$player['avatar'] = ju_get_avatar($player['id_forum']);
							$player['name'] = utf8_encode(get_names($player['id_forum']));

							$onerank['INFO']['count'][$player['id_forum']] = $player;
							$onerank['count'][] = $player;
						}
					}

					$ZeTag = $onerank;
			break;

			case "SPECIAL":
				$ZeTag['name'] = $name;
				$ZeTag['id'] = $name;
				$ZeTag['type'] = "special";

				switch($name)	{
						// Joueurs REGISTERED SIBYLLA connectés sur TS.
					case "ONLINE_TS":
						require_once("../TS3/ts3_functions.php");
						$return = ts3_getOnlineUsers();
							// On parcours les différents jouers syb connectés.
							if($return['errors'][0] != '') {
								break;
							}
							else {
								foreach($return['count'] as $id) {
										// Rajout infos  usuelles.
									$player['avatar'] = ju_get_avatar($id);
									$player['name'] = utf8_encode(get_names($id));
									$player['id_forum'] = $id;

										// Si on veut TOUTES les infos.
									if($all) {
											// ##########
											// VAISSEAUX.
											// ##########
										$query = $mysqli->query("SELECT * FROM star_ships WHERE owner='".$id."'");
											// On récupère tous les vaisseaux de l'id courant.
										while($ship = $query->fetch_assoc()) {
											if($shipType[$ship['type_id']])	$ship['ship_type'] = $shipType[$ship['type_id']];
											else {
													// Si on a pas en cache le nom du type de vaisseau on le cache.
												$q = $mysqli->query("SELECT name FROM star_ship WHERE id='".$ship['type_id']."' LIMIT 1");
												$type = $q->fetch_assoc();

												$shipType[$ship['type_id']] = $type['name'];
												$ship['ship_type'] = $shipType[$ship['type_id']];
											}
												// Dernières petites ajouts
											$ship['owner_name'] = utf8_encode(get_names($ship['owner']));
											$ZeTag['SHIP_COUNT'][] = $ship;
											$ZeTag['INFO']['SHIP_COUNT'][$ship['id']] = $ship;
										}
									}

									$ZeTag['count'][] = $player;
									$ZeTag['INFO']['count'][$player['id_forum']] = $player;

								}
							}
					break;
				}
			break;
		}

		return $ZeTag;
}


$_POST = json_decode(file_get_contents('php://input'), true);
if($_POST['name'] && $_POST['category']) {
	$mysqli = new_mysql_co();
	mysqli_set_charset($mysqli, "utf8");
	$i = 0;
	error_reporting(0);


	$name = $_POST['name'];
	$cat = $_POST['category'];

	print_r(json_encode(tags_get_single($name,$cat)));
	$mysqli->close();
}
?>
