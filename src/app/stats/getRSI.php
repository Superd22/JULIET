<?php
  $try = json_decode(file_get_contents("list_RSI.txt"));

  foreach($try as $memb) {
    if ($memb->handle != '') {
      $person[strtolower($memb->handle)] = $memb;
    }
  }
    echo json_encode($person);

?>
