"use strict";$(function(){$("#login").validate({rules:{username:{required:!0,minlength:2,maxlength:5},password:{required:!0,minlength:2,maxlength:5},nickname:{required:!0,minlength:2,maxlength:5}},messages:{username:{required:"请填写注册信息",minlength:"最少 2 个字符",maxlength:"最多 10 个字符"}},submitHandler:function(e){e=$(e).serialize();$.post("/ald/register.php",e,null,"json").then(function(e){console.log(e),0===e.code?console.log(123):1===e.code&&(console.log("成功"),window.location.href="./login.html")})}})});