$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
            delay: 3000, //1秒切换一次
        },
        pagination: {
            el: '.swiper-pagination',
            clickable :true,
        },
    })

    /*鼠标移入停止轮播*/
    var comtainer = document.querySelector('.swiper-container');
    comtainer.onmouseover = function () {
        mySwiper.autoplay.stop();
    };
    // 鼠标离开 继续轮播
    comtainer.onmouseout = function () {
        mySwiper.autoplay.start();
    }


    



})