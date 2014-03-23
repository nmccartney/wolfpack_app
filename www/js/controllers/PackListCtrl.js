app_pack.controller('PackListCtrl',function( $scope,$state, UserService,PackService ){
//    console.log('packs include - ' ) ;
    $scope.packs = PackService.packs;
    $scope.$on('packs.update',function(e){
        console.log('packs updated ', PackService.packs);
        $scope.packs = PackService.packs;
    });

    if(!UserService.user.user_id)$state.go('app');
})