$(function () {

    // 1. 使用 validate 插件进行表单验证操作
    $('#login').validate({
      // 规则配置
      rules: {
        username: {
            required: true,
            minlength: 2,
            maxlength: 5
        },
        password: {
            required: true,
            minlength: 2,
            maxlength: 5
        },
        nickname: {
            required: true,
            minlength: 2,
            maxlength: 5
        }
      },
      // 提示信息配置
      messages: {
        username: {
          required: '请填写注册信息',
          minlength: '最少 2 个字符',
          maxlength: '最多 10 个字符'
        }
      },
      // 表单提交事件
      submitHandler (form) {
        // 2. 进行表单提交
        // 2-1. 拿到用户填写的内容
        const info = $(form).serialize()
  
        // 2-2. 发送请求到后端, 准备接受结果
        $.post('/ald/register.php', info, null, 'json').then(res => {
          // res 就是后端给我的结果
          console.log(res)
  
        //   3. 注册成功以后的操作
          if (res.code === 0) {
            // 注册失败
            // $('.login_error').removeClass('hide')
            console.log(123)
          } else if (res.code === 1) {
            // 3-2. 注册成功, 跳转页面, 存储 cookie
            // 为了在首页还需要使用
            console.log('成功')

            // setCookie('nickname', res.nickname)
            // // 跳转页面
            window.location.href = './login.html'
          }
        })
      }
    })
  })
  