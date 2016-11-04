<?php
header('Content-type: application/json');
  define('IN_PHPBB', true);

  $phpbb_root_path = '../../Forum/';
  $phpEx = 'php';
  include('../../Forum/common.php');
  include('../../Forum/includes/functions_user.php');
  include('../inc/mysql.inc.php');

  $phpEx = 'php';

  // Récuperer les différents groueps Sibylla.
  $mysqli = new_mysql_co();
  $groups = $mysqli->query("SELECT group_id FROM testfo_groups WHERE group_name LIKE '%Sibylla%'");

    while($group = $groups->fetch_assoc())  {
      $groupSibs[] = $group["group_id"];
    }

$access = array();
    foreach($groupSibs as $gp) {
      $fleet = group_memberships($gp);
        foreach($fleet as $memb) {
          $access[$memb["user_id"]] = $memb["username"];
        }
    }
    print_r(json_encode($access));
?>
