/* creat start*/
indexModule.controller('indexCtr',['$scope',function($scope){
    //document.querySelector(".indexUl li").click();
}]);

indexModule.controller('parentCtr',['$scope','$state','$location','$$receiveTopTab',function($scope,$state,$location,$$receiveTopTab){
    $scope.status = 'member';
    $scope.$on('to-child',function(event,data){
        $scope.status = data;
    });
    $scope.changeLi = function(e){
        var e = e.target;
        if(e.nodeName != "LI")return;
        $scope.status = e.getAttribute("data-id");
        switch($scope.status){
            case 'message':
                $state.go('message.wxMsg');
                break;
            case 'goods':
                $state.go('goods.kuGods');
                break;
            case 'member':
                $state.go('member.dengjiMeb');
                break;
            case 'orders':
                $state.go('orders.all');
                break;
        }
    }
    //接收当前头部导航选中项
    $$receiveTopTab($scope,function(msg){
        $scope.status = msg;
    });
}]);

//信息
indexModule.controller('messageCtr',['$scope','$state','$$changeTopTab','$$receiveLeftTab',function($scope,$state,$$changeTopTab,$$receiveLeftTab){
    $scope.msgLi = 'wx';
    $scope.messageLi = function(e){
        var e = e.target;
        if(e.nodeName != "LI")return;
        $scope.msgLi = e.getAttribute("data-msg");
        switch($scope.msgLi){
            case 'wx' :
                $state.go('message.wxMsg');
                break;
            case 'iphone':
                $state.go('message.iphoneMsg');
                break;
        }
    }
    //发送当前选择项给父视图
    $$changeTopTab($scope,'message');

    //接收当前左边导航的选中项
    $$receiveLeftTab($scope,function(msg){
        $scope.msgLi = msg;
    });

}]);

//商品
indexModule.controller('goodsCtr',['$scope','$state','$$changeTopTab','$$receiveLeftTab',function($scope,$state,$$changeTopTab,$$receiveLeftTab){
    $scope.godsLi = 'chu';
    $scope.goodsCha = function(e){
        var e = e.target;
        if(e.nodeName != "LI")return;
        $scope.godsLi = e.getAttribute("data-god");
        switch($scope.godsLi){
            case 'chu':
                $state.go('goods.sale');
                break;
            case 'ku':
                $state.go('goods.kuGods');
                break;
            case 'yi':
                $state.go('goods.saled');
                break;
        }
    }
    //发送当前选择项给父视图
    $$changeTopTab($scope,'goods');

    //接收当前左边导航的选中项
    $$receiveLeftTab($scope,function(msg){
        $scope.godsLi = msg;
    });
}]);

//客户
indexModule.controller('memberCtr',['$scope','$state','$$changeTopTab','$$receiveLeftTab',function($scope,$state,$$changeTopTab,$$receiveLeftTab){
    $scope.mige = 'dj';
    $scope.chaManige = function(e){
        var e = e.target;
        if(e.nodeName != "LI")return;
        $scope.mige = e.getAttribute("data-ige");
        switch($scope.mige){
            case 'whole':
                $state.go('member.wholeMeb');
                break;
            case 'retail':
                $state.go('member.retailMeb');
                break;
            case 'dj':
                $state.go('member.dengjiMeb');
                break;
            case 'bq':
                $state.go('member.biaoqianMeb');
                break;
        }
    }
    //发送当前选择项给父视图
    $$changeTopTab($scope,'member');

    //接收当前左边导航的选中项
    $$receiveLeftTab($scope,function(msg){
        $scope.mige = msg;
    });
}]);

//订单
indexModule.controller('ordersCtr',['$scope','$state','$$changeTopTab','$$receiveLeftTab',function($scope,$state,$$changeTopTab,$$receiveLeftTab){
    $scope.ordLi = 'all';
    $scope.orderCha = function(e){
        var e = e.target;
        if(e.nodeName != "LI")return;
        $scope.ordLi = e.getAttribute("data-ord");
        switch($scope.ordLi){
            case 'all':
                $state.go('orders.all');
                break;
            case 'store':
                $state.go('orders.store');
                break;
            case 'iphone':
                $state.go('orders.iphone');
                break;
            case 'tai':
                $state.go('orders.tai');
                break;
        }
    }
    //发送当前选择项给父视图
    $$changeTopTab($scope,'orders');

    //接收当前左边导航的选中项
    $$receiveLeftTab($scope,function(msg){
        $scope.ordLi = msg;
    });
}]);


