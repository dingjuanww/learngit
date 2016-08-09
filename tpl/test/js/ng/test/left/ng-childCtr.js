/* creat start*/
indexModule.controller('childCtr',['$scope','$state',function($scope,$state){
    $scope.$on('to-parent',function(event,data){
        console.log(event.targetScope,data);
        if(data == 'goods'){
            $state.go('ng-left.goods');
        }
    });
}]);

