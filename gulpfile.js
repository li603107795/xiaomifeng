const gulp = require('gulp')
const sass = require('gulp-sass')
const cssmin = require('gulp-cssmin')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
const del = require('del')
const webserver = require('gulp-webserver')


const sassHandler = () => {
    return gulp
      .src('./src/sass/*.scss')
      .pipe(sass()) // 转码
    //   .pipe(cssmin()) // 压缩
      .pipe(gulp.dest('./dist/sass/')) // 存放到指定目录
}

const cssHandler = () => {
    return gulp
      .src('./src/css/*.css')
    //   .pipe(cssmin())
      .pipe(gulp.dest('./dist/css/'))
}

const jsHandler = () => {
    // 3-1. 找到 js 文件
    return gulp
      .src('./src/js/*.js')
      // .pipe(babel({ presets: ['@babel/env'] })) // ES6 转码
      // .pipe(uglify()) // 压缩
      .pipe(gulp.dest('./dist/js/')) // 保存
      
}

const htmlHandler = () => {
    // 4-1. 找到 html 文件
    return gulp
      .src('./src/pages/*.html')
      // 因为 htmlmin 的所有打包信息都需要以参数的形式进行配置
      .pipe(htmlmin({ // 压缩
        // collapseWhitespace: true, // 去除空白内容
        // collapseBooleanAttributes: true, // 简写布尔值属性
        // removeAttributeQuotes: true, // 去除属性上的双引号
        // removeComments: true, // 去除注释
        // removeEmptyElements: true, // 去除空元素
        // removeEmptyAttributes: true, // 去除空的属性
        // removeScriptTypeAttributes: true, // 去除 script 标签上的 type 属性
        // removeStyleLinkTypeAttributes: true, // 去除 style 标签和 link 标签上的 type 属性
        // minifyJS: true, // 压缩内嵌式 js 代码, 不认识 ES6
        // minifyCSS: true, // 压缩内嵌式 css 文本, 不能自动加前缀
      }))
      .pipe(gulp.dest('./dist/pages/')) // 保存
}

const imgHandler = () => {
    // 找到文件
    return gulp
      .src('./src/images/*.**')
      .pipe(gulp.dest('./dist/images/'))
}

const assetsHandler = () => {
    return gulp
      .src('./src/assets/**/*')
      .pipe(gulp.dest('./dist/assets'))
}


const delHandler = () => {
    return del('./dist/')
}

const webHandler = () => {
    return gulp
      .src('./dist/')
      .pipe(webserver({ // 开启服务器
        host: 'www.daq.com',
        port: 8080,
        open: './pages/index.html', // 默认打开哪一个文件, 从 dist 目录开始向后写
        livereload: true, // 自动刷新
        proxies: [
          {
            source: '/ald',
            target: 'http://localhost:80/lgm/'
          }
        ]
      }))
}


const watchHandler = () => {
    // 不需要 return
    // 实时开启监控, 多个任务执行的时候, 需要把这个任务放在最后
    gulp.watch('./src/css/*.css', cssHandler)
    gulp.watch('./src/sass/*.scss', sassHandler)
    gulp.watch('./src/js/*.js', jsHandler)
    gulp.watch('./src/pages/*.html', htmlHandler)
    gulp.watch('./src/images/*.**', imgHandler)
}


const defaultHandler = gulp.series(
    delHandler,
    gulp.parallel(sassHandler, cssHandler, jsHandler, htmlHandler, imgHandler, assetsHandler),
    webHandler,
    watchHandler
)


module.exports.sassHandler = sassHandler
module.exports.cssHandler = cssHandler
module.exports.jsHandler = jsHandler
module.exports.htmlHandler = htmlHandler
module.exports.imgHandler = imgHandler
module.exports.assetsHandler = assetsHandler
module.exports.delHandler = delHandler
// 为什么一定要起名叫做 default
// 因为你在命令行执行的时候, 如果书写 $ gulp default
// 可以简写成 $ gulp
module.exports.default = defaultHandler