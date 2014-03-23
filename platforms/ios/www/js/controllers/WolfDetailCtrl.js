app_pack.controller('WolfDetailCtrl',function( $scope,$state,WolfService ){

    console.log('view wolf - ', WolfService.wolf)
    WolfService.updateWolf(WolfService.wolf);


    $scope.$on('wolf.update',function(e){
        console.log('wolf updated ', WolfService.wolf);
        $scope.packs = WolfService.wolf.related_packs;

        console.log('wolf packs - ', $scope.packs);
    }) ;

    //make sure we have data. if not send them home
    if(!WolfService.wolf.id)$scope.goHome();
})