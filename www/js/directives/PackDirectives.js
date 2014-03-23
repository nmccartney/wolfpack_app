app_pack.directive('pack',['PackService','$state', function( PackService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('pack - ', scope.pack )

            scope.gotoPack = function(){
                PackService.pack = scope.pack;
                $state.go('packs.detail' , {packId : scope.pack.id});
            };
        },
        template:
            "<div snap-close ng-click='gotoPack()'>"+
                "<h3>{{pack.name}}</h3>"+
            "</div>"
    }
}]);

app_pack.directive('packBanner',['PackService','$state', function( PackService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

            scope.pack = PackService.pack;
        },
        template:
            "<div class='pack-banner'>"+
                "<h1>{{pack.name}}</h1>"+
                "<img src='http://www.wolfpack.io{{pack.thumb}}'/>"+
                "<div>{{pack}}</div>"+
            "</div>"
    }
}]);

app_pack.directive('removePack',['PackService','$state', function( PackService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

            scope.removePack = function(){
                PackService.remove(scope.pack);
            };
        },
        template:
            "<span>Remove {{pack.name}}"+
                "</span>"
    }
}]);

app_pack.directive('addWolfToPack',['WolfService','PackService',function( WolfService,PackService){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

            scope.addWolf = function(){
                PackService.addWolf(scope.wolf);
            };
        },
        template:
            "<span>Add {{wolf.username}}"+
                "</span>"
    }
}]);

app_pack.directive('removeWolfFromPack',['WolfService','PackService',function( WolfService,PackService){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

            scope.removeWolf = function(){
                PackService.removeWolf(scope.wolf);
            };
        },
        template:
            "<span>Remove {{wolf.username}}"+
                "</span>"
    }
}]);