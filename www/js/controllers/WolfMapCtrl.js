app_pack.controller('WolfMapCtrl',function( $scope,$state, UserService ){
//    console.log('packs include - ' ) ;
    google.maps.visualRefresh = true;
    $scope.styles = gmapStyles;
    $scope.center = {
        latitude: 40.44042902802058,
        longitude: -80.00189414819334,
        lat: 40,
        lng: -80
    };
    $scope.latitude = null;
    $scope.longitude = null;

    $scope.zoom = 16;

    $scope.markers = [];

    $scope.markerLat = null;
    $scope.markerLng = null;

    $scope.addMarker = function (lng,lat) {
        $scope.markers.push({
            latitude: parseFloat(lat),
            longitude: parseFloat(lng)
        });

        $scope.markerLat = null;
        $scope.markerLng = null;
    };

    navigator.geolocation.getCurrentPosition(function(position) {
//        alert(hello);
        $scope.center = {
            latitude:position.coords.latitude ,
            longitude:position.coords.longitude
        }
        $scope.addMarker(position.coords.longitude,position.coords.latitude);
    },function(e) { alert("Error retrieving position " + e.code + " " + e.message) });
})