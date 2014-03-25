app_pack.controller('PackListCtrl',function( $scope,$state, UserActions,UserService,PackService ){
//    console.log('packs include - ' ) ;
    $scope.packs = PackService.packs;
    $scope.$on('packs.update',function(e){
        console.log('packs updated ', PackService.packs);
        $scope.packs = PackService.packs;
    });

    if(!UserService.user.user_id)$state.go('app');

    $scope.logout = function(){
        UserActions.logout(UserService.user)
            .then(function(r){
                console.log('ng user logged out', r) ;
                UserService.updateUser({});
                $state.go('app');
            });
    }
})