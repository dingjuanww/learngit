/* creat start*/
var indexModule = angular.module('indexTest',['ui.router','ngAnimate'],['$httpProvider',function($httpProvider){
    //重写param,不然angular异步提交参数，后台接收不到,没有form Data
    // 头部配置
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Accept'] = 'application/json, text/javascript, */*; q=0.01';
    $httpProvider.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
    /**
     * 重写angular的param方法，使angular使用jquery一样的数据序列化方式  The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */
    var param = function (obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for (name in obj) {
            value = obj[name];

            if (value instanceof Array) {
                for (i = 0; i < value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value instanceof Object) {
                for (subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if (value !== undefined && value !== null)
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }

        return query.length ? query.substr(0, query.length - 1) : query;
    };

    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function (data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
}]);

//异步请求
indexModule.factory('$$ajaxPostServer', [function($http) {  //自定义指令：$$ajaxPostServer,最后一定要return返回自定义的指令名称
    var $$ajaxPostServer = function(method,url,data,callback){
        $http({
            method: method,
            url:url,
            data: data
        }).success(function(response){
            console.log("success!");
            if(callback){
                callback(response);
            }
        }).error(function(){
            console.log("异常");
        });
    };
    return $$ajaxPostServer;
}]);

/**
 * 只要是头部和左边的点击事件触发，就会更改view和选中项
 * */
//更改头部导航选中项
indexModule.factory('$$changeTopTab',[function(){
    return function(scope,status){
        scope.$emit("changeTopTab",status);
    }
}]);

//接收头部导航选中项
indexModule.factory('$$receiveTopTab',[function(){
    return function(scope,fn){
        scope.$on('changeTopTab',function(event,msg){
            fn(msg);
        })
    }
}]);

//更改左边导航选中项
indexModule.factory('$$changeLeftTab',[function(){
    return function(scope,status){
        scope.$emit("changeLeftTab",status);
    }
}]);

//接收左边导航选中项
indexModule.factory('$$receiveLeftTab',[function(){
    return function(scope,fn){
        scope.$on('changeLeftTab',function(event,msg){
            fn(msg);
        })
    }
}]);

indexModule.config(function($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('message', { //消息
            url: '/message',
            templateUrl: '/tpl/test/ng-html/ng-left/message.html',
            controller: 'messageCtr'
        })
        .state('message.wxMsg',{
            url:'/wx',
            templateUrl:'/tpl/test/ng-html/ng-right/message/wxMsg.html'
        })
        .state('message.iphoneMsg',{
            url:'/iphone',
            templateUrl:'/tpl/test/ng-html/ng-right/message/iphoneMsg.html'
        })
        .state('member', { //客户
            url: '/member',
            templateUrl: '/tpl/test/ng-html/ng-left/member.html',
            controller: 'memberCtr'
        })
        .state('member.wholeMeb',{
            url:'/wholeMeb',
            templateUrl:'/tpl/test/ng-html/ng-right/member/wholeMeb.html'
        })
        .state('member.retailMeb',{
            url:'/retailMeb',
            templateUrl:'/tpl/test/ng-html/ng-right/member/retailMeb.html'
        })
        .state('member.dengjiMeb',{
            url:'/dengjiMeb',
            templateUrl:'/tpl/test/ng-html/ng-right/member/dengjiMeb.html'
        })
        .state('member.biaoqianMeb',{
            url:'/biaoqianMeb',
            templateUrl:'/tpl/test/ng-html/ng-right/member/biaoqianMeb.html'
        })
        .state('goods', { //商品
            url:'/goods',
            templateUrl: '/tpl/test/ng-html/ng-left/goods.html',
            controller: 'goodsCtr'
        })
        .state('goods.kuGods',{
            url:'/kuGods',
            templateUrl:'/tpl/test/ng-html/ng-right/goods/kuGods.html'
        })
        .state('goods.saled',{
            url:'/saled',
            templateUrl:'/tpl/test/ng-html/ng-right/goods/saledGods.html'
        })
        .state('goods.sale',{
            url:'/sale',
            templateUrl:'/tpl/test/ng-html/ng-right/goods/saleGods.html'
        })
        .state('orders', { //订单
            url:'/orders',
            templateUrl: '/tpl/test/ng-html/ng-left/orders.html',
            controller: 'ordersCtr'
        })
        .state('orders.all',{
            url:'/all',
            templateUrl:'/tpl/test/ng-html/ng-right/orders/allOrs.html'
        })
        .state('orders.store',{
            url:'/store',
            templateUrl:'/tpl/test/ng-html/ng-right/orders/storeOrs.html'
        })
        .state('orders.iphone',{
            url:'/iphone',
            templateUrl:'/tpl/test/ng-html/ng-right/orders/iphoneOrs.html'
        })
        .state('orders.tai',{
            url:'/tai',
            templateUrl:'/tpl/test/ng-html/ng-right/orders/taiOrs.html'
        });
    $urlRouterProvider.otherwise('/member/dengjiMeb');
});
