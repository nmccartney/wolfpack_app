app_pack.controller('WolfMapCtrl',function( $scope,$state, pgGPS ){
//    console.log('packs include - ' ) ;
    google.maps.visualRefresh = true;
    $scope.styles = gmapStyles;
    $scope.center = {
        latitude: 40.44042902802058,
        longitude: -80.00189414819334
    };
//    if(pgGPS.coords!=={})$scope.center = pgGPS.coords
    $scope.zoom = 16;

    $scope.markers = [];


    $scope.addMarker = function (lng,lat) {
        $scope.markers.push({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        });

    };

    $scope.$on('pgGPS.update',function(e,r){
        $scope.addMarker(r.longitude,r.latitude);
        $scope.center = {
            latitude: r.latitude,
            longitude: r.longitude
        };
        google.maps.visualRefresh = true;
        $scope.$apply();
    });

    pgGPS.getCurrentPosition();
})