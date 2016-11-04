<?php

require_once("../RSI Cross_Bridges/API.PHP");

$ju = new RSI_API();
$admin_co = $ju->LoginRSI();
print_r($admin_co);

$post = array(
  "symbol" => "SIBYLLA",
  "admin_mode" => 1,
  "pagesize" => 32,
  "page" => 0
);
$coucou = $ju->sendPost("https://robertsspaceindustries.com/api/orgs/getOrgMembers",$post);


// Premierement on compte le nombre de membre.
preg_match('#"data":{"totalrows":"([0-9]*)"#', $coucou, $count);
$max = $count[1];

// Ensuite, on lance la boucle.
  $step = 32;
  $page = 0;

  $main = "";
  for($page = 0; ($page-1) * $step <= $max; $page++ ) {
    $post = array(
      "symbol" => "SIBYLLA",
      "admin_mode" => 1,
      "search" => "",
      "pagesize" => 32,
      "page" => $page
      );

      $new = $ju->sendPost("https://robertsspaceindustries.com/api/orgs/getOrgMembers",$post);
      preg_match('#,"html":"(.*)"},"code"#',$new,$data);

      $main .= $data[1];
  }


  $final = preg_match_all("/data-member-nickname=\\\\\"(.*)\\\\\".*Membership: ([a-zA-Z ]*)<\\\\\\/span>/U",$main,$matches);
  $r = preg_match_all('/<span class=\\\\\"title\\\\\">(.*)\\<\\\\\\/span>/U',$main,$visible);


foreach(array_unique($matches[1]) as $i=>$handle) {
  $warray = array("handle" 		 => $handle,
                  "visibility" => $matches[2][$i],
                  "type"			 => ($visible[1][$i] == "Roles" ? "main" : "affiliate")
                );
    $person[] = $warray;
}

  file_put_contents("list_RSI.txt", json_encode($person));
//{symbol: "SIBYLLA", admin_mode: "1", search: "", pagesize: 32, page: 2}



$ju->logout($admin_co);
?>
