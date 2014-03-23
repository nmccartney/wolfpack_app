app_pack.service('WolfService',[ '$rootScope','WolfActions', function($rootScope, WolfActions){
    var service = {
        wolf:{},
        updateWolf:function(w){
            WolfActions.getWolf(w).then(function(r){
                service.wolf = r;
                $rootScope.$broadcast( 'wolf.update' );
            })

        },
        wolves:[],
        update:function(w){
            service.wolves = w;
            $rootScope.$broadcast( 'wolves.update' );
        } ,
        add:function(w){
            service.wolves.push(w);
            $rootScope.$broadcast( 'wolves.update' );
        }   ,
        remove:function(w){

            var index = service.wolves.indexOf(w);

            WolfActions.removeWolf(w.id)
                .then(function(r){
                    console.log('remove wolf - ', index);

                    service.wolves.splice(index,1);

                    $rootScope.$broadcast( 'wolves.update' );

                    return r;
                });

        }
    }
    return service;
}]);

