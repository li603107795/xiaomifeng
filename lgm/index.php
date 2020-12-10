<?php

$renqi = $_GET['renqi'];
$party = $_GET['party'];
$kafei = $_GET['kafei'];


    $sql = "SELECT * FROM `list`";
    $sql .= " WHERE `goods_title`='$renqi' OR `goods_title`='$party' OR `goods_title`='$kafei' ";
    
  $link = mysqli_connect('localhost', 'root', 'root', 'lgm');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  echo json_encode(array(
    "message" => "获取商品列表成功",
    "list" => $data,
  ));

?>