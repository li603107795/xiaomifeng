$(function () {

    const list_info = {
        cat_one: 'all',
        sort_type: 'ASC',
        sort_method: '价格',
        current: 1,
        pagesize: 8
    }


    getCateOne()
    async function getCateOne() {
        // 1-2. 发送请求获取
        const cat_one_list = await $.get('/ald/getCatOne.php', null, null, 'json')

        // 1-3. 进行分页列表渲染
        let str = `<span data-type="all" class="active">全部</span>`

        cat_one_list.list.forEach(item => {
            str += `
          <span data-type="${ item.cat_one }">${ item.cat_one }</span>
        `
        })

        $('.cateOneBox > .right').html(str)
    }

    // 请求分页器
    getTotalPage()
    async function getTotalPage() {
        // 2-1. 请求分页数据
        const totalInfo = await $.get('/ald/getTotalPage.php', list_info, null, 'json')

        // 2-2. 渲染分页内容
        // jquery-pagination 插件
        $('.pagination').pagination({
            pageCount: totalInfo.total,
            coping: true,
            homePage: '首页',
            endPage: '末页',
            current: list_info.current,
            callback(index) {
                list_info.current = index.getCurrent()
                // 从新请求商品列表
                getGoodsList()
            }
        })
    }


    //3.请求商品列表数据
    getGoodsList()
    let list
    async function getGoodsList() {
        const res = await $.get('/ald/getGoodsList.php', list_info, null, 'json')
        // console.log(res.list)
        list = res.list
        let str = ''
        res.list.forEach(item => {
            str += `
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
        })
        $('.ren div.item_wrap ul').html(str)
    }


    // 4. 一级分类的点击事件
    // 4-1. 事件委托的形式进行事件绑定
    $('.cateOneBox').on('click', 'span', function () {
        // 4-2. 操作类名
        $(this).addClass('active').siblings().removeClass('active')

        // 4-3. 拿到你点击的是哪一个
        const type = $(this).data('type')

        // 4-6. 只要一级分类进行切换, 修改二级分类为 all
        // 4-6. 只要一级分类进行切换, 修改三级分类为 all
        // 让当前页回到第一页
        list_info.current = 1

        // 4-4. 修改 list_info
        list_info.cat_one = type
        // 从新渲染分类信息和列表数据
        getTotalPage()
        getGoodsList()
    })


    $('.sortBox').on('click', 'span', function () {
        // 7-2. 拿到信息
        const type = $(this).attr('data-type')
        $(this).toggleClass('active')
        // 7-3. 切换类名

        // 7-4. 修改对象信息
        list_info.sort_type = type

        // 7-5. 从新请求
        getTotalPage()
        getGoodsList()

        // 7-6. 修改 data-type 属性
        // 为下一次准备的
        $(this).attr('data-type', type === 'ASC' ? 'DESC' : 'ASC')
    })

    //跳转详情页

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


})