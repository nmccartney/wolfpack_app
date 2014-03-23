app_pack.service('UserService',[ '$rootScope','WolfActions','WolfService','PackService', function($rootScope,WolfActions,WolfService,PackService){
    var service = {
        user:{},
        updateUser:function(u){
            service.user = u;


            WolfActions.getYourWolves(service.user.user_id)
                .then(function(r){
//                    console.log('wolves = ', r)  ;

                    service.user['wolf'] = r;
                    WolfService.update(service.user.wolf.related_wolves);
                    PackService.update(service.user.wolf.related_packs);

                    $rootScope.$broadcast( 'user.update' );

                });
        }
    }
    return service;
}]);

