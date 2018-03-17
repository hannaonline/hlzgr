// 获取 gulp
var gulp = require('gulp')
// 多个文件合并为一个;
var concat = require('gulp-concat')
// 获取 gulp-less模板
var less = require('gulp-less')
// 获取用于压缩css
var minifycss = require('gulp-minify-css')
// sourcemaps 地图文件
var sourcemaps = require('gulp-sourcemaps')
// 获取 uglify 模块（用于压缩 JS）
var uglify = require('gulp-uglify')

// 当发生异常时提示错误
var notify = require('gulp-notify')
var plumber = require('gulp-plumber')

// css3前缀自动补全
var autoprefixer = require('gulp-autoprefixer');

// 删除文件
var del = require('del')
gulp.task('clean', function (cl) {
  del([
    'dist/**'
  ], cl)
})

// 编译less
gulp.task('less', function () {
  gulp.src('src/less/**.less')
      .pipe(sourcemaps.init())
      .pipe(plumber({errorHandler: notify.onError('Error:<%= error.message%>')}))
      .pipe(less())
      .pipe(autoprefixer())
      .pipe(concat('uiqr.min.css'))
      .pipe(minifycss())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('dist/css'))
})

// 编译js
gulp.task('js', function () {
  gulp.src('src/js/**.js')
      // .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

// img
gulp.task('img', function () {
  gulp.src('src/img/**')
      // .pipe(uglify())
    .pipe(gulp.dest('dist/img'))
})

// 默认任务
// gulp.task('default', ['less', 'js', 'img', 'clean', 'watch'])
gulp.task('default', ['less', 'js', 'img', 'watch'])

// 监听文件
gulp.task('watch', function () {
  gulp.watch('src/less/**.less', ['less'])
  gulp.watch('src/js/**.js', ['js'])
  gulp.watch('src/img/**', ['img'])
})
