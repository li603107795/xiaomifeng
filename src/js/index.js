var mySwiper = new Swiper ('.swiper-container', {
    autoplay: {
        delay: 2000
    },
    // allowTouchMove: false,
    loop: true, // 循环模式选项
    effect : 'fade',
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletElement : 'li',
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';}
    },
  })        
  /*鼠标移入停止轮播*/
  var comtainer = document.querySelector('.swiper-container');
  comtainer.onmouseenter = function () {
    mySwiper.autoplay.stop();
  };
  // 鼠标离开 继续轮播
  comtainer.onmouseleave = function () {
    mySwiper.autoplay.start();
  }

$(function (){

  const list_info = {
    renqi: '人气推荐',
    party: '庆生蛋糕',
    kafei: '咖啡下午茶',
  }
  getGoodsList()
  async function getGoodsList() {
    const goodsList =await $.get('/ald/index.php', list_info, null, 'json')
    
    // console.log(goodsList)

    let str1 = ''
    const renqi =  goodsList.list.filter(item => {
      return item.goods_title == list_info.renqi
    })
    // console.log(renqi)
    
    renqi.forEach(item => {
      str1 += `
      <li>
        <a class="abc" data-id="${ item.id }" href="" onclick="return false;">
            <div class="item_info">
                <h3>${item.goods_name}</h3>
                <h4>￥${item.goods_price}</h4>
            </div>
            <div class="imgbox imgtop"><img src=${item.goods_imgtop} alt=""></div>
            <div class="imgbox imgbottom"><img src=${item.goods_imgbottom} alt=""></div>
        </a>
      </li>
      `
      $('.ren div.item_wrap ul').html(str1)

    })

    

    let str2 = ''
    const party =  goodsList.list.filter(item => {
      return item.goods_title == list_info.party
    })

    // console.log(party)
    party.forEach(item => {
      str2 += `
      <li>
        <a class="abc" data-id="${ item.id }" href="" onclick="return false;">
            <div class="item_info">
                <h3>${item.goods_name}</h3>
                <h4>￥${item.goods_price}</h4>
            </div>
            <div class="imgbox imgtop"><img src=${item.goods_imgtop} alt=""></div>
            <div class="imgbox imgbottom"><img src=${item.goods_imgbottom} alt=""></div>
        </a>
      </li>
      `
      $('.birthday div.item_wrap ul').html(str2)

    })




    let str3 = ''
    const kafei =  goodsList.list.filter(item => {
      return item.goods_title == list_info.kafei
    })

    // console.log(kafei)

    kafei.forEach(item => {
      str3 += `
      <li>
        <a class="abc" data-id="${ item.id }" href="" onclick="return false;">
            <div class="item_info">
                <h3>${item.goods_name}</h3>
                <h4>￥${item.goods_price}</h4>
            </div>
            <div class="imgbox imgtop"><img src=${item.goods_imgtop} alt=""></div>
            <div class="imgbox imgbottom"><img src=${item.goods_imgbottom} alt=""></div>
        </a>
      </li>
      `
      $('.kf div.item_wrap ul').html(str3)

    })
    
  }

  
      // 9. 点击跳转到详情页
      $('.content div.item_wrap').on('click', 'a.abc', function () {
        // 9-2. 拿到 标签身上记录的商品 id
        console.log(123)
        const id = $(this).data('id')
        // 9-3. 把这个 id 存储到 cookie 中
        setCookie('id', id)
        // 9-4. 进行页面跳转
        window.location.href = './detail.html'
    })


    $('li.food').click(function (e){
      $(this).find('ol').toggleClass('hide')
    })

    $('ol').click(e => e.stopPropagation())
  

})