$('.cart').click(function () {
    $(this).find('.cartbox').toggleClass('active')
})
$(window).scroll(function () {
    let scrolltop = $(this).scrollTop()
    if(scrolltop) {
        $('.gotop').css('display', 'block')
    }else{
        $('.gotop').css('display', 'none')
    }
})
const gotop = document.querySelector('.gotop')
gotop.onclick = function () {
    window.scrollTo({
        top:0,
        left:0,
        behavior: 'smooth'
    })
}
$('.gotop').hover(function () {
        $(this).text('返回顶部')
        $(this).css('background',  '#666666')
    }, function () {
        $(this).text('')
        $(this).css('background',  'url(../images/gotop.png) no-repeat -42px  #666666')
    }
)
// console.log($('.content div.item_wrap .imgtop'))

$('.content div.item_wrap').on('mouseenter', 'a.abc', function () {
    console.log(123)
    $(this).find('.imgtop').stop().animate({
        opacity:0
      }, 200, 'linear', () =>{ } )
    $(this).find('.imgbottom').stop().animate({
        opacity:1,
        zoom: 1.25,
      }, 200, 'linear', () => {} )
})

$('.content div.item_wrap').on('mouseleave', 'a.abc', function () {
    $(this).find('.imgtop').stop().animate({
        opacity:1
      }, 200, 'linear', () =>{ } )
    $(this).find('.imgbottom').stop().animate({
        opacity:0,
        zoom: 1,
      }, 200, 'linear', () => {} )
})
