<?php

  // 1. 接受参数
  $one = $_GET['cat_one'];
  $pagesize = $_GET['pagesize'];

  // 2. 准备 sql 语句
  $sql = "SELECT * FROM `list`";
  if ($one != 'all') $sql .= " WHERE `cat_one`='$one'";

  // 查询数据库, 找到有多少种分类就可以了
  $link = mysqli_connect('localhost', 'root', 'root', 'lgm');
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  // 返回结果给前端
  // 我应该返回一共多少页
  $total = ceil(count($data) / $pagesize);
  echo json_encode(array(
    "message" => "获取总数成功",
    "code" => 1,
    "total" => $total,
  ));



?>