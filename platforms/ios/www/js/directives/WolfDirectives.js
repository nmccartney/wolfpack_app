app_pack.directive('wolf',['WolfService','$state', function( WolfService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

            scope.gotoWolf = function(){
                WolfService.wolf = scope.wolf;
                $state.go('wolves.detail' , {wolfId : scope.wolf.id});
            };
        },
        template:
            "<div class='wolf-list-item' snap-close ng-click='gotoWolf();'>"+
                "<div class='wolf-img'>"+
                    "<img width='50px' height='50px' src='http://www.wolfpack.io{{wolf.thumb}}'/>"+
                "</div>"+
                "<div class='wolf-name'>{{wolf.username}}</div>"+
                "<div style='clear:both;'></div>"+
            "</div>"
    }
}]);

/**
 * BANNER FOR CURRENTLY SIGNED IN USER
 */
app_pack.directive('userBanner',['UserService','$state', function( UserService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;


            scope.user = UserService.user
        },
        template:
            "<div class='user-banner'>"+
                "<div class='user-img'><img src='http://www.wolfpack.io{{user.wolf.thumb}}'/></div>"+
                "<div class='user-name'>{{user.username}}</div>"+
//                "<current-gps></current-gps>"+
                "<div style='clear:both;'></div>"+
//                "<div>{{user}}</div>"+
            "</div>" +
                "<wolf-map></wolf-map>"+
            "<wolf-notifications></wolf-notifications>"

    }
}]);
/**
 * BANNER FOR WOLF DETAIL VIEW
 */
app_pack.directive('wolfBanner',['WolfService','$state', function( WolfService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

            scope.wolf = WolfService.wolf
        },
        template:
            "<div class='wolf-banner'>"+
                "<div class='wolf-img'><img src='http://www.wolfpack.io{{wolf.thumb}}'/></div>"+
                "<div class='wolf-name'>{{wolf.username}}</div>"+
                "<div style='clear:both;'></div>"+
                "<wolf-stats></wolf-stats>"+
                "<remove-wolf></remove-wolf>"+
            "</div>" +
            "<wolf-actions></wolf-actions>"
    }
}]);

app_pack.directive('wolfStats',['WolfService','$state', function( WolfService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){

        },
        template:
            "<div class='wolf-stats'>"+
                "<div id='stats'>Only 5 miles away!</div>"+
            "</div>"
    }
}]);

app_pack.directive('wolfActions',['WolfService','$state', function( WolfService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){

        },
        template:
            "<div class='wolf-actions'>"+
                "<button id='action-find'>Goto</button>"+
                "<button id='action-find'>Meet~</button>"+
                "<button id='action-find'>Chat</button>"+
            "</div>"
    }
}]);

app_pack.directive('wolfNotifications',['Invites','$state', function( Invites,WolfService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
            console.log('getting invites', Invites)
            Invites.query({},function(r){
                console.log('invites = ' , r)
                scope.invites = r;
            });
        },
        template:
            "<div class='wolf-notifications'>"+
                "<h4>Notifications</h4>"+
                "<div ng-repeat='invite in invites'><wolf-invite></wolf-invite></div>"+
            "</div>"
    }
}]);

app_pack.directive('wolfInvite',['InviteActions','WolfService', function( InviteActions, WolfService){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
            scope.accept = function(idx){
                InviteActions.accept(scope.invite)
                    .then(function(r){
                        console.log('accepted');
                        WolfService.add(r.wolf);
                        scope.invites.splice(idx,1);
                    });
            }
            scope.decline = function(idx){
                InviteActions.decline(scope.invite)
                    .then(function(r){
                        scope.invites.splice(idx,1);
                    });
            }
        },
        template:
            "<div class='wolf-invite'>"+
                "<span class='invite-img'><img src='http://www.wolfpack.io{{invite.invitor.avatar_url}}' />  </span>"+
                "<span class='invite-name'>{{invite.invitor.name}} wants to join. </span>"+
                "<span class='btn' ng-click='accept($index)'>accept</span> | "+
                "<span class='btn' ng-click='decline($index)'>decline</span>"+
//                "{{invite}}"+
                "<div style='clear:both;'></div>"+
            "</div>"
    }
}]);



app_pack.directive('currentGps',['$state', function( WolfService, $state){
    return {
        restrict: "AE" ,
        link:function(scope,element,attr){
//            console.log('wolf - ', scope.wolf ) ;

              //TODO USE PHONEGAP GEO FACTORY
        },
        template:
            "<div>Current Position"+
                "{{position.coords.longitude}} / {{position.coords.latitude}}</div>"
    }
}]);

app_pack.directive('removeWolf',['WolfService','$state', function( WolfService, $state){
    return {
        restrict: "E" ,
        link:function(scope,element,attr){

            scope.removeWolf = function(){

                WolfService.remove(scope.wolf);
                scope.goHome();
            };
        },
        template:
            "<div>"+
                "<button  ng-click='removeWolf()'>Leave {{wolf.username}}</button>"+
            "</div>"
    }
}]);


app_pack.directive('wolfMap',['WolfService','$state', function( WolfService, $state){
    return {
        restrict: "E" ,
        scope:'@',
        link:function(scope,element,attr){

        },
        template:
            "<div ng-controller='WolfMapCtrl'>"+
                "<div class='google-map' center='center'  zoom='zoom' "+
                "markers='markers' latitude='latitude' longitude='longitude'" +
                "mark-click='true'  draggable='true' fit='false'  styles='styles'"+
                "events='eventsProperty' style='height: 300px; width: 100%' "+
                "data-snap-ignore='true'>"+
                "</div>"+
            "</div>"
    }
}]);


var gmapStyles = [
    {
        "featureType": "landscape",
        "stylers": [
            {
                "hue": "#00EFFF"
            },
            {
                "saturation": -82.56410256410257
            },
            {
                "lightness": -32.470588235294116
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.highway",
        "stylers": [
            {
                "hue": "#B500FF"
            },
            {
                "saturation": -22.175732217573213
            },
            {
                "lightness": -32.325490196078434
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "stylers": [
            {
                "hue": "#00FCFF"
            },
            {
                "saturation": 100
            },
            {
                "lightness": -68.8
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            {
                "hue": "#0098FF"
            },
            {
                "saturation": -83.6065573770492
            },
            {
                "lightness": -48.8
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "water",
        "stylers": [
            {
                "hue": "#0098FF"
            },
            {
                "saturation": 39.748953974895386
            },
            {
                "lightness": -41.72549019607843
            },
            {
                "gamma": 1
            }
        ]
    },
    {
        "featureType": "poi",
        "stylers": [
            {
                "hue": "#0099FF"
            },
            {
                "saturation": 27.43362831858407
            },
            {
                "lightness": -59.372549019607845
            },
            {
                "gamma": 1
            }
        ]
    }
];
//<div class="google-map"
//center="center"
//zoom="zoom"
//markers="markers"
//latitude="latitude"
//longitude="longitude"
//mark-click="true"
//draggable="true"
//fit="false"
//styles="styles"
//events="eventsProperty"
//style="height: 900px; width: 100%"
//data-snap-ignore="true">
//</div>
//<div class="clearfix"></div>
//    <div  id="map-ui" class="row">
//        <div>
//            <ul class="nav nav-pills">
//                <li >
//                    <a ng-click="zoom = zoom -1" href="">
//                    --
//                    </a>
//                </li>
//                <li >
//                    <a href="" ng-click="findMe()" class="fui-location">
//                    </a>
//
//                </li>
//                <li>
//                    <a ng-click="zoom = zoom+1" href="" class="fui-plus">
//                    </a>
//                </li>
//            </ul>
//        </div>
//        <div class="clearfix"></div>
//    </div>