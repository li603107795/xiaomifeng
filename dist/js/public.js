"use strict";$(".cart").click(function(){$(this).find(".cartbox").toggleClass("active")}),$(window).scroll(function(){$(this).scrollTop()?($(".gotop").css("display","block"),$(".head").css("box-shadow","0 0 10px -3px #6e6e6e")):($(".gotop").css("display","none"),$(".head").css("box-shadow",""))});var gotop=document.querySelector(".gotop");function setCookie(o,t,i){var e;void 0!==i?((e=new Date).setTime(e.getTime()-288e5+1e3*i),document.cookie=o+"="+t+";expires="+e):document.cookie=o+"="+t}function getCookie(o){for(var t={},i=document.cookie.split("; "),e=0;e<i.length;e++){var n=i[e].split("=");t[n[0]]=n[1]}return void 0===o?t:t[o]}function delCookie(o){setCookie(o,"",-1)}gotop.onclick=function(){window.scrollTo({top:0,left:0,behavior:"smooth"})},$(".gotop").hover(function(){$(this).text("返回顶部"),$(this).css("background","#666666")},function(){$(this).text(""),$(this).css("background","url(../images/gotop.png) no-repeat -42px  #666666")}),$(".content div.item_wrap").on("mouseenter","a.abc",function(){$(this).find(".imgtop").stop().animate({opacity:0},400,"linear",function(){}),$(this).find(".imgbottom").stop().animate({opacity:1,zoom:1.25},400,"linear",function(){}),$(this).css("box-shadow","0 0 15px #aaa")}),$(".content div.item_wrap").on("mouseleave","a.abc",function(){$(this).find(".imgtop").stop().animate({opacity:1},400,"linear",function(){}),$(this).find(".imgbottom").stop().animate({opacity:0,zoom:1},400,"linear",function(){}),$(this).css("box-shadow","")});var nickname=getCookie("nickname");nickname?($(".login").addClass("hide"),$(".users").removeCLass("hide").text("您好:".concat(nickname))):($(".login").removeClass("hide"),$(".users").addClass("hide"));