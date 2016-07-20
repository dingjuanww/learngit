/**
 * Created by Administrator on 2016/7/19.
 */
var gulp = require('gulp');

// 引入组件
var htmlmin = require('gulp-htmlmin'),  //html压缩
    imagemin = require('gulp-imagemin'), //图片压缩
    pngcrush = require('imagemin-pngcrush'),
    minifycss = require('gulp-minify-css'), //css压缩
    jshint = require('gulp-jshint'), //js检测
    uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //文件合并
    rename = require('gulp-rename'), //文件更名
    rev = require('gulp-rev');  //对文件名加MDS后缀
    revCollector = require('gulp-rev-collector');  //路径替换
    notify = require('gulp-notify'); //提示信息

// 压缩html
gulp.task('html', function() {
    console.log("开始压缩html...");
    return gulp.src('./tpl/test/vue-html/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./tpl/test/vue-html/vue-server/'))
        .pipe(notify({ message: 'html task ok' }));

});

// 压缩图片
gulp.task('img', function() {
    return gulp.src('./tpl/test/image/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('./tpl/test/image/image-sever'))
        .pipe(notify({ message: 'img task ok' }));
});

// 合并、压缩、重命名css
gulp.task('css', function() {
    return gulp.src('./tpl/test/css/*.css')
        //.pipe(concat('main.css'))
        //.pipe(gulp.dest('dest/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(rev())
        .pipe(gulp.dest('./tpl/test/css/css-server/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/test/css/'))
        .pipe(notify({ message: 'css task ok' }));
});

// 检查js
gulp.task('lint', function() {
    return gulp.src('./tpl/test/js/vue/test/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'lint task ok' }));
});

// 合并、压缩js文件
gulp.task('js', function() {
    return gulp.src('./tpl/test/js/vue/test/*.js')
        //.pipe(concat('all.js'))   //src/js下所有的js文件 合并到all.js
        //.pipe(gulp.dest('dest/js'))  //合并后文件放入目标文件夹
        .pipe(rename({ suffix: '.min' }))  //重命名
        .pipe(uglify())  //混淆文件
        .pipe(rev())  //压缩后的文件将重新命名，本来原本是.min开始的，现在是另一个格式。
        .pipe(gulp.dest('./tpl/test/js/vue/test/test-server/'))   //将混淆后文件放入目标文件夹
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev/test/js/'))
        .pipe(notify({ message: 'js task ok' }));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('img', 'css', 'lint', 'js', 'html');

    //监听html文件变化
    gulp.watch('./tpl/test/vue-html/*.html', function(){
        gulp.run('html');
    });

    //监听 .css files
    gulp.watch('./tpl/test/css/*.css', ['css']);

    //监听 .js files
    gulp.watch('./tpl/test/js/vue/test/*.js', ['lint', 'js']);

    //监听 image files
    gulp.watch('./tpl/test/image/*', ['img']);
});