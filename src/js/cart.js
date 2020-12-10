$(function () {

    // 0. 进行登录判断
    // 如果没有登录, 直接跳转回登录页
    // 通过 cookie
    const nickname = getCookie('nickname')
    if (!nickname) return window.location.href = './login.html'

    // 1. 拿到 localStorage 里面的 cart 数据
    const cart = JSON.parse(window.localStorage.getItem('cart')) || []

    console.log(nickname)
    console.log(cart)
    // 2. 判断 cart 的 length, 决定执行进行哪一个渲染
    if (!cart.length) {
        // 表示购物车没有数据
        // 购物车列表添加 hide 类名, 进行隐藏
        $('.on').addClass('hide')
        $('.off').removeClass('hide')
        return
    }

    $('.off').addClass('hide')
    $('.on').removeClass('hide')

    //进行渲染

    bindHtml()
    function bindHtml() {
        // 决定全选按钮是否选中
        const quanxuan = cart.every(item => item.is_select == '1')
        // 计算商品的数量和价格
        let total = 0
        let totalMoney = 0
        cart.forEach(item => {
            if(item.is_select == '1') {
                total += item.cart_number - 0
                totalMoney += item.cart_number * item.goods_price
                // console.log(total)
            }
        })

        let str = `
            <div class="title"><h1>购物袋</h1></div>
            <ul class="goods_wrap">
        `
        // let str = `
        //     <div class="panel panel-info">
        //     <div class="panel-heading">
        //     <p class="selectAll">
        //         <span>全选:</span>
        //         <input type="checkbox" ${selectAll? 'checked' : ''}>
        //         <span class="text">购 物 清 单</span>
        //     </p>
        //     </div>
        //     <div class="panel-body">
        //         <ul class="goodsList">
        // `

        cart.forEach(item => {
            // console.log(item)
            str += `
            <li>
                <input class="danxuan" data-price="${item.goods_price}" type="checkbox" ${item.is_select == '0' ? '' : 'checked'}>
                <div class="imgbox">
                    <img src=${item.cart_img} alt="">
                    <h3>${item.goods_name}</h3>
                    <p>尺寸很大|适合多少很多人|好几套餐具</p>
                </div>
                <div class="price">
                    <p class=".jiage"><span>￥${item.goods_price}</span>/件</p>
                    <p class="num">
                        <i class="jian" data-price="${item.goods_price}">-</i>
                        <span>${item.cart_number}</span>
                        <i class="jia" data-price="${item.goods_price}">+</i>
                    </p>
                    <p class="all">
                        <span>￥总价${ (item.goods_price * item.cart_number).toFixed(2) }</span>
                        <i class="del"  data-price="${item.goods_price}">删除</i>
                    </p>
                </div>
            </li>
            `
        })

        str +=`
        </ul>
        <div class="goon">
            <h4>
                <a href="./list.html">继续购物</a>
                <i class="clear">清空购物车</i>
                <span class="num">一共${total}件商品 </span>
                <span class="zong">总金额 : ￥ ${totalMoney}</span>
            </h4>
            <p>全选<input class="quanxuan" data-id="" type="checkbox" ${quanxuan? 'checked' : ''}></p>
            <button class="goumai" ${ totalMoney ===0 ? 'disabled' : ''}>立即购买</button>
        </div>
        `
        $('.on').html(str)
    }


    $('.on').on('click', '.danxuan', function () {
        const type = this.checked
        const price = $(this).data('price')
        // console.log(type)
        // console.log(price)

        // console.log(123)
        const info = cart.filter(item => item.goods_price == price)[0]
        info.is_select = type ? '1' : '0' 
        // const selectAll = cart.every(item => item.is_select === '1')
        // if(selectAll){
        //     $('.selectAll > input').prop('checked', true)
        //     console.log($('.selectAll > input').prop('checked'))
        // }else{
        //     $('.select > input').prop('checked', false)
        //     console.log($('.select > input').prop('checked'))
        // }
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

    $('.on').on('click', '.quanxuan', function () {
        const type = $(this).prop('checked')
        console.log(type)
        cart.forEach(item => item.is_select = type ? '1' : '0')
        // if(type){
        //     console.log($('.select > input'))
        //     $('.select > input').prop('checked', true)
        // }else {
        //     $('.select > input').prop('checked', false)
        // }
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })


    $('.clear').click(function () {
        cart = []
        bindHtml()
        window.location.reload()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })


    $('.on').on('click', '.jian',function (){
        const price = $(this).data('price')
        console.log(price)
        const info = cart.filter(item => item.goods_price == price)[0]
        if(info.cart_number === 1 )return
        info.cart_number = info.cart_number - 0 - 1
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

        // 数量++
    $('.on').on('click', '.jia',function (){
        const price = $(this).data('price')
        console.log(price)
        const info = cart.filter(item => item.goods_price == price)[0]
        info.cart_number = info.cart_number - 0 + 1
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
    })

    $('.on').on('click', '.del', function () {
        const price = $(this).data('price')
        for (let i = 0; i < cart.length; i++) {
            if( cart[i].goods_price == price){
                cart.splice(i, 1)
                // i--
                break
            }
        }
        bindHtml()
        window.localStorage.setItem('cart', JSON.stringify(cart))
        if(!cart.length) return window.location.reload()
    })
    




})