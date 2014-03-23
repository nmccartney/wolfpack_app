app_pack.controller('WolfListCtrl',function( $scope,$state, WolfActions, UserService,WolfService ){
//    console.log('wolves include - ' ) ;
    $scope.wolves = WolfService.wolves;
    $scope.$on('wolves.update',function(e){
        console.log('wolves updated ', WolfService.wolves);
        $scope.wolves = WolfService.wolves;
    });


    if(!UserService.user.user_id)$state.go('app');
})