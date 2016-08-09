/* creat start*/
var myModule = angular.module('modalTest',['ui.bootstrap','ngAnimate'],['$httpProvider',function($httpProvider){
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

myModule.factory('$$ajaxMethodServer',function($http){   //创建一个异步服务
    //发送请求
    var $$ajaxMethodServer = function(method,url,data,callback){
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
    return $$ajaxMethodServer;
});

//popover删除弹框
myModule.directive('popoverCancel',function(){
    return {
        restrict: "AE",
        priority: 1,
        replace: true,
        scope: {
            'text' : '@text',
            'placement' : '@placement',
            'cancelText' : '@cancelText',
            'confirm' : '&',
            'cancel' : '&',
            'hasConfirmClosePop' : '@hasConfirmClosePop',
            'hasCancelClosePop' : '@hasCancelClosePop',
            'popWidth' : '@popWidth'
        },
        templateUrl: '/tpl/test/ng-html/ng-popover.html',
        controller: ['$scope', '$sce', '$timeout', function ($scope, $sce, $timeout) {
            console.log($scope);
            //弹框的位置
            $scope.style = {
                top: 0,
                left: 0,
                display: 'none',
                width : '236px',
                opacity: 0
            };

            //点击其他元素时关闭其他已经打开的弹框
            function close(event){
                var target = event.target;
                //如果点击的是带有notCloseElement属性的元素则不会关闭
                if(target.getAttribute('notCloseElement') != null){
                    return;
                }
                $scope.style.opacity = '0';
                $timeout(function(){
                    $scope.style.display = 'none';
                    //关闭以后取消事件
                    (function(){
                        document.body.removeEventListener('click',close);
                    })()
                },100)
            }

            //点击切换显示按钮
            $scope.togglePopover = function (e) {
                var el = e.target || e.srcElement;
                if(el.nodeName == 'SPAN'){
                    getPlacement($scope.popPlacement, el, function () {
                        if($scope.style.opacity == 1){
                            $timeout(function(){$scope.style.display = 'none';},100)
                        }
                        $scope.style.opacity = $scope.style.opacity == 1 ? 0 : 1;

                        document.body.addEventListener('click',close);

                    });
                }else{
                    return false;
                }

            };

            //点击确认按钮事件
            $scope.confirmBtnEvent = function(){
                //判断是否需要关闭弹框  默认关闭
                if($scope.hasConfirmClose){
                    $scope.style.opacity = '0';
                    $timeout(function(){
                        $scope.style.display = 'none';
                    },100)
                }
                $scope.confirm();
            };

            //点击取消按钮事件
            $scope.cancelBtnEvent = function(){
                //判断是否需要关闭弹框  默认关闭
                if($scope.hasCancelClose){
                    $scope.style.opacity = '0';
                    $timeout(function(){
                        $scope.style.display = 'none';
                    },100)
                }
                $scope.cancel();
            };

            //根据方向选择
            function getPlacement(placement, el, callback) {
                if($scope.style.opacity == 1){
                    callback();
                    return false;
                }else{
                    switch (placement) {
                        case 'top' : setTopPosition(el, callback);
                            break;
                        case 'bottom' : setBottomPosition(el, callback);
                            break;
                        case 'left' : setLeftPosition(el, callback);
                            break;
                        case 'right' : setRightPosition(el, callback);
                            break;
                    }
                }
            }

            //设置方向为top的定位
            function setTopPosition(target, callback) {
                //先显示出来
                $scope.style.display = 'block';
                var pop = angular.element(target).children()[0];
                var elWidth = target.offsetWidth;
                $timeout(function(){
                    //设置top
                    $scope.style.top = '-' + pop.offsetHeight + 'px';

                    //设置left
                    var left = elWidth / 2 - pop.offsetWidth/2;

                    $scope.style.left = left + 'px';
                    $timeout(function () {
                        callback();
                    }, 100);
                },100);


            }

            //设置方向为bottom的定位
            function setBottomPosition(target, callback) {
                //先显示出来
                $scope.style.display = 'block';
                var pop = angular.element(target).children()[0];
                var elWidth = target.offsetWidth,
                    elHeight = target.offsetHeight;
                $timeout(function(){
                    //设置top
                    var top = elHeight;
                    $scope.style.top = top + 'px';

                    //设置left
                    var left = elWidth / 2 - pop.offsetWidth/2;

                    $scope.style.left = left + 'px';
                    $timeout(function () {
                        callback();
                    }, 100);
                },100);

            }

            //设置方向为left的定位
            function setLeftPosition(target, callback) {
                //先显示出来
                $scope.style.display = 'block';
                var pop = angular.element(target).children()[0];
                var elWidth = target.offsetWidth,
                    elHeight = target.offsetHeight;
                $timeout(function(){
                    //设置top
                    var top = pop.offsetHeight/2 - elHeight/2;
                    $scope.style.top = '-' + top + 'px';

                    //设置left
                    var left = pop.offsetWidth;

                    $scope.style.left = '-' + left + 'px';
                    $timeout(function () {
                        callback();
                    }, 100);
                },100);

            }

            //设置方向为right的定位
            function setRightPosition(target, callback) {
                //先显示出来
                $scope.style.display = 'block';
                var pop = angular.element(target).children()[0];
                var elWidth = target.offsetWidth,
                    elHeight = target.offsetHeight;
                $timeout(function(){
                    //设置top
                    var top = pop.offsetHeight/2 - elHeight/2;
                    $scope.style.top = '-' + top + 'px';

                    //设置left
                    var left = elWidth;

                    $scope.style.left = left + 'px';
                    $timeout(function () {
                        callback();
                    }, 100);
                },100);

            }


        }],
        compile: function compile(tElement, tAttrs, transclude) {

            return {

                post: function postLink(scope, iElement, iAttrs, controller) {

                    //默认是点击确认或者删除按钮都会关闭弹框
                    if(typeof(scope.hasConfirmClosePop) == 'undefined' || (scope.hasConfirmClosePop != 'true' || scope.hasConfirmClosePop != 'false')){
                        scope.hasConfirmClose = true;
                    }else{
                        scope.hasConfirmClose = scope.hasConfirmClosePop == 'true' ? true : false;
                    }
                    if(typeof(scope.hasCancelClosePop) == 'undefined' || (scope.hasCancelClosePop != 'true' || scope.hasCancelClosePop != 'false')){
                        scope.hasCancelClose = true;
                    }else{
                        scope.hasCancelClose = scope.hasCancelClosePop == 'true' ? true : false;
                    }
                    //默认宽度是236px 可以设置
                    if(typeof(scope.popWidth) == 'undefined'){
                        scope.style.width = '236px';
                    }else{
                        scope.style.width = scope.popWidth;
                    }
                    //弹框默认方向
                    if(typeof(scope.placement) == 'undefined'){
                        scope.popPlacement = 'top';
                    }else{
                        scope.popPlacement = scope.placement;
                    }
                    //默认删除框提示语
                    if(typeof(scope.cancelText) == 'undefined'){
                        scope.popText = '确认删除吗？';
                    }else{
                        scope.popText = scope.cancelText;
                    }

                }

            }

        }
    }
});

//alert提示弹框
myModule.directive('alertMsg',function(){
    return {
        restrict:'AE',
        template:'<div class="alert alert-danger afaAlert" ng-show="show">{{message}}</div>',
        replace:true,
        scope:{
            message:'=message',
            show:'=show'
        },
        controller : ['$scope',function($scope){

        }]

    }
});

//底部分页
myModule.directive('pageNation',function(){
    return {
        restrict : 'AE',
        templateUrl : '/tpl/test/ng-html/ng-page.html',
        replace : true,
        scope : {
            conf : '='
        },
        link : function(scope , ele , attrs) {
            scope.$watch("conf.total + conf.currentPage", function () {
                var page = scope.page = {};
                var conf = scope.conf;
                // 分页数组
                scope.pageList = [];
                scope.pageListFn = function () {
                    // 一共多少页
                    page.limit = Math.ceil((conf.total/10) / conf.itemPageLimit);

                    // 最多展示多少可见页码 默认为10
                    page.defaultLimit = conf.defaultLimit ? conf.defaultLimit : 10;

                    // 三种打点方式 ， 中间打点， 左边打点， 后边打点
                    console.log(page.limit, page.defaultLimit);
                    if (page.limit < page.defaultLimit) {  //page.limit  为NaN
                        for (var i = 1; i <= page.limit; i++) {
                            scope.pageList.push(i);
                        }
                    } else {
                        if (Number(conf.currentPage) < 4) {
                            for (var i = 1; i < 5; i++) {
                                scope.pageList.push(i);
                            }
                            scope.pageList.push('...', page.limit);
                        } else if (Number(conf.currentPage) >= Number(page.limit - 3)) {
                            for (var i = page.limit - 4; i < page.limit; i++) {
                                scope.pageList.push(i);
                            }
                            scope.pageList.unshift(1, '...');
                        } else {
                            for (var i = Number(conf.currentPage) - 2; i < Number(conf.currentPage) + 2; i++) {
                                scope.pageList.push(i);
                            }
                            scope.pageList.push('...', page.limit);
                            scope.pageList.unshift(1, '...');
                        }
                    }
                };
                scope.pageListFn();

                // 点击页码
                scope.changePage = function (page) {
                    if (page == '...') return;
                    conf.currentPage = page;

                };

                // 上一页
                scope.prevPage = function () {
                    if (conf.currentPage <= 1) return;
                    conf.currentPage -= 1;
                };

                // 下一页
                scope.nextPage = function () {
                    if (conf.currentPage >= page.limit) return;
                   conf.currentPage = Number(conf.currentPage) + Number(1);
                };

                // 跳转页
                scope.linkPage = function () {
                   console.log(conf.currentPage);
                   if (!conf.linkPage) return;
                   conf.linkPage = conf.linkPage.replace('',/[^0-9]/);
                   if (conf.linkPage == 0 || conf.linkPage > page.limit) {
                     conf.linkPage = page.limit;
                   }
                   conf.currentPage = conf.linkPage;
                }

            });
        }
    }
});


