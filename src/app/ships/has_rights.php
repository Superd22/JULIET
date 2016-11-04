<?php
require_once("../inc/function.php");
error_reporting(0);
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

	$userid = $_POST['user'];
    if($user)

  ?>
