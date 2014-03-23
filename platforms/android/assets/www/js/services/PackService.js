app_pack.service('PackService',[ '$rootScope', function($rootScope){
    var service = {
        packs:[],
        pack:{},
        update:function(p){
            service.packs = p;
            $rootScope.$broadcast( 'packs.update' );
        } ,
        add:function(p){
            $rootScope.$broadcast( 'packs.update' );
        }   ,
        remove:function(p){
            $rootScope.$broadcast( 'packs.update' );
        }
    }
    return service;
}]);