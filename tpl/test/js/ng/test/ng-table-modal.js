/* creat start*/
myModule.controller('modalCtr',['$scope','$$ajaxMethodServer','$uibModal','$sce','$timeout',function($scope,$$ajaxMethodServer,$uibModal,$sce,$timeout){
    $scope.page = 1;
    $scope.loadData = function(){
        $$ajaxMethodServer('post','/tpl/test/json/ng-table-modal.json',{page:$scope.page},function(rt){
            console.log(rt);
            $scope.lists = rt.data.list;
            $scope.count = rt.data.count;

        });
    };
    $scope.loadData();


    /****模态框****************************************/
    $scope.animationsEnabled = true;
    $scope.showDetail = function(e,id,size){
        var modalInstance = $uibModal.open({  //初始化模态框
            animation : $scope.animationsEnabled,
            template: '<div class="modal-header">'+
                    '<h5 class="modal-title">详细信息</h5>'+
                '</div>'+
                '<div class="modal-body">'+
                    'id: <b>我是{{ id }}的内容</b>'+
                    '<input type="text" name="status" ng-model="status" />'+
                    '<span>{{status}}</span>'+
                '</div>'+
                '<div class="modal-footer">'+
                    '<button class="btn btn-confirm" type="button" ng-click="ok()">确定</button>'+
                    '<button class="btn btn-default" type="button" ng-click="cancel()">取消</button>'+
                '</div>',
            size: size,//--有默认值，可以传入lg，sm
            scope : $scope,//--指定scope的范围
            controller:['$scope',function($scope){
                var ev = e.target;
                $scope.id = id;
                $scope.ok = function () {
                    ev.innerHTML = $scope.status;
                    modalInstance.close();
                };
                $scope.cancel = function () {
                    modalInstance.dismiss('cancel');  //退出
                };
            }]
        });
        /**
         * 第一个fn代表close()后的触发事件
         * 第二个fn代表dismiss()后的触发事件
         * **/
        modalInstance.result.then(function (selectedItem) {
            console.log('触发close');
        }, function () {
            console.log('触发dismiss');
        });

    };
    /****模态框****************************************/


    /****popover框*************************************/
    //$scope.dynamicPopover = {
    //    content: '当模板里面调用的是:uib-popover-html="dynamicPopover.content"的时候这里面的内容才有用',
    //    template: $sce.trustAsHtml('<div style="text-align:center;margin-bottom:10px;">确定删除吗？</div>'+
    //        '<button style="margin-right:10px;" class="btn btn-sm btn-confirm" ng-click="confirm(id)">确认</button>'+
    //        '<button class="btn btn-sm btn-default" ng-click="cancel()">取消</button>'),
    //    title: '',
    //    trigger:'click'
    //};
    //$scope.style="123"
    //$scope.placement = {
    //    options: [
    //        'top',
    //        'top-left',
    //        'top-right',
    //        'bottom',
    //        'bottom-left',
    //        'bottom-right',
    //        'left',
    //        'left-top',
    //        'left-bottom',
    //        'right',
    //        'right-top',
    //        'right-bottom'
    //    ],
    //    selected: 'left'
    //};
    //
    //$scope.htmlPopover = $sce.trustAsHtml('<b style="color: red">I can</b> have <div class="label label-success">HTML</div> content');
    $scope.confirm = function(text){
        console.log(text);
        console.log('确认删除');
    };
    $scope.cancel = function(){
        console.log('取消删除');
    };

    /****popover框*************************************/


    /****alert弹框*************************************/
    $scope.addAlert = function(){
        $scope.hasDataShow = true;
        $scope.text = "我的alert弹框";
        $timeout(function(){
            $scope.hasDataShow = false;
        },2500);
    };
    /****alert弹框*************************************/


    /****底部分页*************************************/
    $scope.conf = {
        total : $scope.count,  //共有多少条数据
        currentPage : 1,  //异步获取动态的页数
        itemPageLimit : 1,  //初始化的时候默认选中第1页
        // 是否显示一页选择多少条
        isSelectPage : false,
        // 是否显示快速跳转
        isLinkPage : false
    }
    $scope.$watch('conf.currentPage + count' , function(news){  //监听异步之后的总页数，并赋值
        console.log($scope.conf.currentPage , $scope.count);
        if($scope.count != undefined){
            $scope.conf.total = $scope.count;  //共有多少条数据
        }
        $scope.page = $scope.conf.currentPage ? $scope.conf.currentPage:1;
        console.log($scope.page);
        $scope.loadData();
    })
    /****底部分页*************************************/

    console.log(document.getElementsByTagName("thead")[0].parentNode.nextSibling);

}]);