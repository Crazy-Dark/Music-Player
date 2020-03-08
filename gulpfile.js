var gulp = require('gulp');

// 取到插件
var htmlClean = require('gulp-htmlclean');  // 压缩html
var uglify = require('gulp-uglify');           // 压缩js
var stripDebug = require("gulp-strip-debug");  // 取消测试代码
var less =  require("gulp-less");          // 将less装化成css
var cleanCss = require("gulp-clean-css");   // 压缩css
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");   // 添加前缀
var connect = require("gulp-connect")   // 开启本地服务
// var imageMin = require('gulp-imagemin');    // 压缩image
// var tinypngNokey = require('gulp-tinypng-nokey');    // 压缩image

// 判断当前环境变量
var devMod = process.env.NODE_ENV == "development";
console.log(devMod)
// 设置当前环境变量export NODE_ENV=development

// 将目录存在对象中，使用时更加灵活
var folder = {
    src: "src/",
    dist: "dist/"
}

// 建立一个html任务
gulp.task("html", function() {
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
        if(!devMod){
            page.pipe(htmlClean())
        }
        page.pipe(gulp.dest(folder.dist + "html/"))
})

// 建立一个image任务
gulp.task("image", function() {
    gulp.src(folder.src + "image/*")
        // .pipe(tinypngNokey())
        .pipe(gulp.dest(folder.dist + "image/"))
})

// 建立一个css任务
gulp.task("css", function() {
    var page = gulp.src(folder.src + "css/*")
        .pipe(connect.reload())
        .pipe(less())
        .pipe(postcss([autoprefixer()]))
        if(!devMod){
            page.pipe(cleanCss())
        }
        page.pipe(gulp.dest(folder.dist + "css/"))
})

// 建立一个js任务
gulp.task("js", function() {
    var page = gulp.src(folder.src + "js/*")
        .pipe(connect.reload())
        .pipe(stripDebug())
        if(!devMod) {
            page.pipe(uglify())
        }
        page.pipe(gulp.dest(folder.dist + "js/"))
})

gulp.task("server", function() {
    connect.server({
        port: "8383",
        livereload: true    // 自动刷新.pipe(connect.reload())
    })
})

// 监听文件变化
gulp.task("watch", function() {
    gulp.watch(folder.src + "html/*", ["html"])
    gulp.watch(folder.src + "css/*", ["css"])
    gulp.watch(folder.src + "js/*", ["js"])
    gulp.watch(folder.src + "image/*", ["image"])
})

// 建立任务队列
gulp.task('default', ["html", "css", "js", "image", "server", "watch"])