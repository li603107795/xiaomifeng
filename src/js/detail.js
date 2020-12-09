$(function () {
    var mySwiper = new Swiper('.swiper-container', {
        loop: true, // 循环模式选项
        autoplay: {
            // delay: 3000, //1秒切换一次
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
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


    
    let size = {
        time:'最早明日08:30起送',
        canju:'+6套餐具',
        renshu:'适合3-6人使用',
        daxiao:17,
    }
    let size2 = {
        time:'最早明日08:30起送',
        canju:'+12套餐具',
        renshu:'适合6-10人使用',
        price:500,
        daxiao:20,
        
    }
    
    
    const id = getCookie('id')

    let info = null
    
    getGoodsInfo()
    async function getGoodsInfo() {
        const goodsInfo = await $.get('/ald/getGoodsInfo.php', {goods_id: id}, null, 'json')

        // console.log(goodsInfo)
        info = goodsInfo.info
        // 3. 进行页面的渲染
        bindHtml(goodsInfo.info)

        // 给提前准备好的变量进行赋值
        
    }


    function bindHtml(info) {
        $('div.detail div.banner .swiper-container div.one').css('background-image', `url(${info.goods_img1})`)
        $('div.detail div.banner .swiper-container div.two').css('background-image', `url(${info.goods_img2})`)
        $('div.detail div.banner .swiper-container div.three').css('background-image', `url(${info.goods_img3})`)

        // 商品详细信息渲染
        $('.detail_info').html(`
        <h1>${info.goods_name}</h1>
        <h2>${info.goods_info}</h2>
        <div class="goods_size">
            <div class="size_img"><img src=${info.goods_size1} alt=""></div>
            <div class="size_info">
                <div class="size_time"
                    style="background:url(https://images.ebeecake.com/img_c/size/times25.png) no-repeat;">
                    最早明日08:30配送</div>
                <div class="size_canju"
                    style="background:url(https://images.ebeecake.com/img_c/size/covers25.png) no-repeat;">${size.canju}
                </div>
                <div class="size_renshu"
                    style="background:url(https://images.ebeecake.com/img_c/size/numbers25.png) no-repeat;">${size.renshu}
                </div>
                <div class="size_price">￥${info.goods_price}/<span style="font-size:13px;">${size.daxiao}cm</span></div>
            </div>
        </div>
        <div class="select_box">
            <ul class="sizelist">
                <li class="default active" data-id="${size.daxiao}">
                    <i>${size.daxiao}厘米</i>
                </li>
                <li class="default" data-id="${size2.daxiao}">
                    <i>${size2.daxiao}厘米</i>
                </li>
            </ul>
        </div>
        <div class="addCartBox">
            <button class="addCart" data-price="${info.goods_price}">加入购物袋</button>
            <button class="buy">继续选购</button>
        </div>
        `)

        $('.detail_info').on('click', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active')
            const type = $(this).data('id')
            if(type == 17){
                $('.detail_info').find('div.size_img').html(`<img src=${info.goods_size1} alt="">`)
                $('.detail_info').find('div.size_canju').text(`${size.canju}`)
                $('.detail_info').find('div.size_renshu').text(`${size.renshu}`)
                $('.detail_info').find('div.size_price').html(`￥${info.goods_price}/<span style="font-size:13px;">${size.daxiao}cm</span>`)
                $('.detail_info').find('button.addCart').attr('data-price', `${info.goods_price}`)
            }
            if(type == 20){
                $('.detail_info').find('div.size_img').html(`<img src=${info.goods_size2} alt="">`)
                $('.detail_info').find('div.size_canju').text(`${size2.canju}`)
                $('.detail_info').find('div.size_renshu').text(`${size2.renshu}`)
                $('.detail_info').find('div.size_price').html(`￥${size2.price}/<span style="font-size:13px;">${size2.daxiao}cm</span>`)
                $('.detail_info').find('button.addCart').attr('data-price', `${size2.price}`)
            }
        })
    }



    $('.detail_info').on('click', 'button.addCart', function () {

        const price = $(this).attr('data-price')
        console.log(price)
        
        const cart = JSON.parse(window.localStorage.getItem('cart')) || []


        // 判断cart里面有没有我要加入的数组
        const flag = cart.some((item) => {
            return item.id == id && item.goods_price == price 
        })

        if(flag){
            const cart_goods = cart.filter((item) => {
                return item.id == id && item.goods_price == price
            })[0]
            cart_goods.cart_number = cart_goods.cart_number - 0 + 1
        }else if(info.goods_price == size2.price){
            info.goods_price = size2.price
            info.cart_number = 1
            cart.push(info)
        }else{
            info.cart_number = 1
            cart.push(info)
        }


        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

    $('.detail_info').on('click', 'button.buy', function () {

        window.location.href = './list.html'

    })







})