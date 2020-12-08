$('.cart').click(function () {
    $(this).find('.cartbox').toggleClass('active')
})


$(window).scroll(function () {
    let scrolltop = $(this).scrollTop()
    if(scrolltop) {
        $('.gotop').css('display', 'block')
        $('.head1').css('box-shadow', '0 0 10px -3px #6e6e6e')
    }else{
        $('.gotop').css('display', 'none')
        $('.head1').css('box-shadow', '')
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

//cookie
function setCookie(key, value, expires) {
    if (expires === undefined) {
      document.cookie = key + '=' + value
      return
    }
    const time = new Date()
    time.setTime(time.getTime() - 1000 * 60 * 60 * 8 + 1000 * expires)
    document.cookie = key + '=' + value + ';expires=' + time
  }
  
  function getCookie(key) {
    const obj = {}
    const tmp = document.cookie.split('; ')
    for (let i = 0; i < tmp.length; i++) {
      const t = tmp[i].split('=')
      obj[t[0]] = t[1]
    }
    if (key === undefined) {
      return obj
    } else {
      return obj[key]
    }
  }
  
  function delCookie(key) {
    setCookie(key, '', -1)
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
    $(this).find('.imgtop').stop().animate({
        opacity:0
      }, 400, 'linear', () =>{ } )
    $(this).find('.imgbottom').stop().animate({
        opacity:1,
        zoom: 1.25,
      }, 400, 'linear', () => {} )
      $(this).css('box-shadow', '0 0 15px #aaa')
})

$('.content div.item_wrap').on('mouseleave', 'a.abc', function () {
    $(this).find('.imgtop').stop().animate({
        opacity:1
      }, 400, 'linear', () =>{ } )
    $(this).find('.imgbottom').stop().animate({
        opacity:0,
        zoom: 1,
      }, 400, 'linear', () => {} )
      $(this).css('box-shadow', '')

})


//验证是否登录
const nickname = getCookie('nickname')

if(nickname){
    $('.login').addClass('hide')
    $('.users').removeClass('hide').html(`您好:${nickname} <button style="color:red;">退出</button>`)
    
    $('.users').on('click', 'button', function() {
      delCookie('nickname')
      window.location.reload()
    })
  }else{
    $('.login').removeClass('hide')
    $('.users').addClass('hide')
  }


  