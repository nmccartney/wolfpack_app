app_pack.service('UserService',[ '$rootScope', function($rootScope){
    var service = {
        user:{},
        updateUser:function(u){
            service.user = u;

            $rootScope.$broadcast( 'user.update' );
        }

    }
    return service;
}]);

