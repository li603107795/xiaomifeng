"use strict";function asyncGeneratorStep(n,i,t,a,e,o,c){try{var s=n[o](c),r=s.value}catch(n){return void t(n)}s.done?i(r):Promise.resolve(r).then(a,e)}function _asyncToGenerator(s){return function(){var n=this,c=arguments;return new Promise(function(i,t){var a=s.apply(n,c);function e(n){asyncGeneratorStep(a,i,t,e,o,"next",n)}function o(n){asyncGeneratorStep(a,i,t,e,o,"throw",n)}e(void 0)})}}$(function(){var n=new Swiper(".swiper-container",{loop:!0,autoplay:{},pagination:{el:".swiper-pagination",clickable:!0}}),i=document.querySelector(".swiper-container");i.onmouseover=function(){n.autoplay.stop()},i.onmouseout=function(){n.autoplay.start()};var t={time:"最早明日08:30起送",canju:"+6套餐具",renshu:"适合3-6人使用",daxiao:17},a={time:"最早明日08:30起送",canju:"+12套餐具",renshu:"适合6-10人使用",price:500,daxiao:20},e=getCookie("id"),o=null;function c(){return(c=_asyncToGenerator(regeneratorRuntime.mark(function n(){var i;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,$.get("/ald/getGoodsInfo.php",{goods_id:e},null,"json");case 2:i=n.sent,o=i.info,function(i){$("div.detail div.banner .swiper-container div.one").css("background-image","url(".concat(i.goods_img1,")")),$("div.detail div.banner .swiper-container div.two").css("background-image","url(".concat(i.goods_img2,")")),$("div.detail div.banner .swiper-container div.three").css("background-image","url(".concat(i.goods_img3,")")),$(".detail_info").html("\n        <h1>".concat(i.goods_name,"</h1>\n        <h2>").concat(i.goods_info,'</h2>\n        <div class="goods_size">\n            <div class="size_img"><img src=').concat(i.goods_size1,' alt=""></div>\n            <div class="size_info">\n                <div class="size_time"\n                    style="background:url(https://images.ebeecake.com/img_c/size/times25.png) no-repeat;">\n                    最早明日08:30配送</div>\n                <div class="size_canju"\n                    style="background:url(https://images.ebeecake.com/img_c/size/covers25.png) no-repeat;">').concat(t.canju,'\n                </div>\n                <div class="size_renshu"\n                    style="background:url(https://images.ebeecake.com/img_c/size/numbers25.png) no-repeat;">').concat(t.renshu,'\n                </div>\n                <div class="size_price">￥').concat(i.goods_price,'/<span style="font-size:13px;">').concat(t.daxiao,'cm</span></div>\n            </div>\n        </div>\n        <div class="select_box">\n            <ul class="sizelist">\n                <li class="default active" data-price="').concat(i.goods_price,'" data-id="').concat(t.daxiao,'">\n                    <i>').concat(t.daxiao,'厘米</i>\n                </li>\n                <li class="default" data-price="').concat(a.price,'" data-id="').concat(a.daxiao,'">\n                    <i>').concat(a.daxiao,'厘米</i>\n                </li>\n            </ul>\n        </div>\n        <div class="addCartBox">\n            <button class="addCart" data-price="').concat(i.goods_price,'">加入购物袋</button>\n            <button class="buy">继续选购</button>\n        </div>\n        ')),$(".detail_info").on("click","li",function(){$(this).addClass("active").siblings().removeClass("active");var n=$(this).data("id");17==n&&($(".detail_info").find("div.size_img").html("<img src=".concat(i.goods_size1,' alt="">')),$(".detail_info").find("div.size_canju").text("".concat(t.canju)),$(".detail_info").find("div.size_renshu").text("".concat(t.renshu)),$(".detail_info").find("div.size_price").html("￥".concat($(this).data("price"),'/<span style="font-size:13px;">').concat(t.daxiao,"cm</span>")),$(".detail_info").find("button.addCart").attr("data-price","".concat($(this).data("price")))),20==n&&($(".detail_info").find("div.size_img").html("<img src=".concat(i.goods_size2,' alt="">')),$(".detail_info").find("div.size_canju").text("".concat(a.canju)),$(".detail_info").find("div.size_renshu").text("".concat(a.renshu)),$(".detail_info").find("div.size_price").html("￥".concat(a.price,'/<span style="font-size:13px;">').concat(a.daxiao,"cm</span>")),$(".detail_info").find("button.addCart").attr("data-price","".concat(a.price)))})}(i.info);case 5:case"end":return n.stop()}},n)}))).apply(this,arguments)}!function(){c.apply(this,arguments)}(),$(".detail_info").on("click","button.addCart",function(){var i=$(this).attr("data-price");console.log(i);var n,t=JSON.parse(window.localStorage.getItem("cart"))||[];t.some(function(n){return n.id==e&&n.goods_price==i})?((n=t.filter(function(n){return n.id==e&&n.goods_price==i})[0]).cart_number-=0,n.cart_number+=1):(o.cart_number=1,o.goods_price=i,t.push(o)),window.localStorage.setItem("cart",JSON.stringify(t))}),$(".detail_info").on("click","button.buy",function(){window.location.href="./list.html"})});