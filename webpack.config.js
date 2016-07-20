/**
 * Created by Administrator on 2016/7/1.
 */
var Webpack = require("webpack");
var path = require('path');

//skin的js目录
var root = __dirname+'/skin/distribution/js/';
//生成的文件目录
var dist = __dirname+'/skin/distribution/js/dist/';
//公共方法文件目录
var common = __dirname+'/skin/distribution/js/src/common/';
//组件文件目录
var components = __dirname+'/skin/distribution/js/src/components/';


module.exports = {
    entry : [
        root+"im/chat"
    ],
    output : {
        // 文件地址，使用绝对路径形式
        path : dist,
        // 公共文件生成的地址
        publicPath: dist,
        //[name]这里是webpack提供的根据路口文件自动生成的名字
        filename : "im/chat.js"
    },
    // 服务器配置相关，自动刷新!
    derServer : {
        historyApiFallback : true,
        hot : false,
        inline : true,
        grogress : true
    },
    module: {
        // 加载器
        loaders: [
            // 解析.vue文件
            { test: /\.vue$/, loader: 'vue' },
            // 转化ES6的语法
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            // 编译css并自动添加css前缀
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            //.scss 文件想要编译，scss就需要这些东西！来编译处理
            //install css-loader style-loader sass-loader node-sass --save-dev
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            // 图片转化，小于8K自动转化为base64的编码
            //{ test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            //html模板编译？
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
        ]
    },
    // .vue的配置。需要单独出来配置。
    vue: {
        loaders: {
            css: 'style!css!autoprefixer',
        }
    },
    // 转化成es5的语法
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue']
    },
    plugins: [
        new Webpack.BannerPlugin("这里是打包文件头部注释！")//注意这是一个数组..
    ]
};