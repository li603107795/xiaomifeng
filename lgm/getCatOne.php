<?php

  // 查询数据库, 找到有多少种分类就可以了
  $link = mysqli_connect('localhost', 'root', 'root', 'lgm');
  // 把数据库里面的数据按照 cat_one_id 这个字段进行分类
  // 每一类数据值拿出第一条
  $sql = "SELECT `cat_one` FROM `list` GROUP BY `cat_one`";
  $res = mysqli_query($link, $sql);
  $data = mysqli_fetch_all($res, MYSQLI_ASSOC);

  // 返回结果给前端
  echo json_encode(array(
    "message" => "获取一级分类列表成功",
    "code" => 1,
    "list" => $data
  ));

?>
