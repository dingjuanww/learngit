/* creat start*/
var indexModule = angular.module('indexTest',['ngTouch'],['$httpProvider',function($httpProvider){
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
indexModule.controller('indexCtr',['$scope','$http',function($scope,$http){
    //发送请求
    $scope.ajaxPostServer = function(method,url,data,callback){
        $http({
            method:method,
            url:url,
            data: data
        }).success(function(response){
            console.log("success!");
            if(callback){
                callback(response);
            }
        }).error(function(){
            console.log("error");
        });
    };
    /*界面上定义的简单赋值*/
    $scope.content1 = "我是con1内容";
    $scope.content3 = "我是con3内容";
    $scope.content4 = "我是con4内容";
    /*切换tab：消息、客户、商品、订单，并请求数据******************************/
    //默认是客户模块,message,member,goods,orders
    $scope.status = "member";  //用于切换的时候保存当前状态
    $scope.ctype = "member";  //传参需要
    $scope.hasShow = "member";  //对应选项卡
    $scope.page = 1;
    $scope.loadDefault = function(){
        $scope.ajaxPostServer('post','',{page:$scope.page,ctype:$scope.ctype},function(rt){
            console.log(rt);
        });
    };
    //一加载页面就执行默认方法
    $scope.loadDefault();
    //切换到消息
    $scope.changeMsg = function(e){
        var src = e.currentTarget;
        var child = src.parentNode.children;
        for(var i=0;i<child.length;i++){
            child[i].style.color = "#333";
        }
        src.style.color = "#fc5502";
        var state = src.getAttribute('data-state');
        $scope.hasShow = state;
        if(state != $scope.status){
            $scope.status = state;  //保存住当前的状态
            $scope.ctype = "message";
            $scope.hasShow = "message";
            $scope.page = 1;
            $scope.loadDefault();
        }
    };
    //切换到客户
    $scope.changeMeb = function(e){
        var src = e.currentTarget;
        var child = src.parentNode.children;
        for(var i=0;i<child.length;i++){
            child[i].style.color = "#333";
        }
        src.style.color = "#fc5502";
        var state = src.getAttribute('data-state');
        $scope.hasShow = state;
        if(state != $scope.status){
            $scope.status = state;  //保存住当前的状态
            $scope.ctype = "member";
            $scope.hasShow = "member";
            $scope.page = 1;
            $scope.loadDefault();
        }
    };
    //切换到商品
    $scope.changeGod = function(e){
        var src = e.currentTarget;
        var child = src.parentNode.children;
        for(var i=0;i<child.length;i++){
            child[i].style.color = "#333";
        }
        src.style.color = "#fc5502";
        var state = src.getAttribute('data-state');
        $scope.hasShow = state;
        if(state != $scope.status){
            $scope.status = state;  //保存住当前的状态
            $scope.ctype = "goods";
            $scope.hasShow = "goods";
            $scope.page = 1;
            $scope.loadDefault();
        }
    };
    //切换到订单
    $scope.changeOrd = function(e){
        var src = e.currentTarget;
        var child = src.parentNode.children;
        for(var i=0;i<child.length;i++){
            child[i].style.color = "#333";
        }
        src.style.color = "#fc5502";
        var state = src.getAttribute('data-state');
        $scope.hasShow = state;
        if(state != $scope.status){
            $scope.status = state;  //保存住当前的状态
            $scope.ctype = "orders";
            $scope.hasShow = "orders";
            $scope.page = 1;
            $scope.loadDefault();
        }
    };

}]);