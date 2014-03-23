'use strict';




// Declare app level module which depends on filters, and services
var app_pack = angular.module('myApp', [
//        'ajoslin.mobile-navigate',
//        'ngMobile',
        'ngResource',
        "google-maps",
        'snap',
        'ui.router' ,
        'LocalStorageModule'
    ])
//    .config(function ($compileProvider){
//        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//    })
    .config(function(localStorageServiceProvider){
        localStorageServiceProvider.setPrefix('wolfpack');
    })
    .config( function( $stateProvider,$urlRouterProvider,$httpProvider,localStorageServiceProvider) {
        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
        // $httpProvider.defaults.headers.common['X-CSRF-Token'] = angular.element('meta[name=csrf-token]').attr('content') ;

        //config routs
        $stateProvider
            .state('app',{
                url:'/',
                views:{
                    'center-content' : {
                        template:
                            "<div>"+
                                "<h1>Center panel ui view</h1>"+
                                "<input ng-model='user.username'></input>"+
                                "<input ng-model='user.password'></input>"+
                                "<button ng-click='login()'>login as {{user}}</button>"+
                                "<div>{{response}}</div>"+
                            "</div>",
                        controller: ''
                    }
                }
            })
            .state('user',{
                url: '/user/:userId',
                views:{
                    'left-sidebar' : {
                        templateUrl:'js/views/PackListView.html'
                        ,
                        controller:'PackListCtrl'
                    } ,
                    'right-sidebar' : {
                        templateUrl:'js/views/WolfListView.html'
                        ,
                        controller:'WolfListCtrl'
                    },
                    'center-header-nav':{
                        template:
                            "<navigation id='header-nav'>"+
                                "<button snap-toggle>Toggle Left</button>"+
                                "<button ng-click='goHome()'>Home</button>"+
                                "<button snap-toggle='right'>Toggle Right</button>"+
                                "</navigation>"

                    },
                    'center-footer-nav':{
                        template:''
                    },
                    'center-content@' : {
                        template:
                            "<div>"+
                                "<user-banner></user-banner>"+
                            "</div>",
                        controller: ''
                    }
                }
            })

        $urlRouterProvider.otherwise("/");
    })
    .controller('AppCtrl',function( $scope,$state, WolfActions, UserService,localStorageService ){
        $scope.user = {};
        $scope.$on('user.update',function(e){
            console.log('user updated ', e);
            $scope.user = UserService.user;
        })

        var token = localStorageService.get('x-CSRF-token');
        var user = localStorageService.get('username');
        var session = localStorageService.get('session_id');
        var id = localStorageService.get('id');

        if(user&&id) {
            UserService.user.username = $scope.user.username = user;
            UserService.user.user_id = $scope.user.id = id;
        }

        $scope.login = function(){
            WolfActions.login($scope.user).then(function(r){
                $scope.response = r.data;
                // $httpProvider.defaults.headers.comm  on['X-CSRF-Token'] = r.data.session_id
                console.log(r);

                localStorageService.add('x-CSRF-token',r.data._csrf_token);
                localStorageService.add('session_id',r.data.session_id);
                localStorageService.add('username',r.data.username);
                localStorageService.add('id',r.data.user_id);


                if(r.data.user_id){
                    UserService.updateUser(r.data);

                    $scope.goHome();

                }else{
                    alert('try again')
                }
            });
        };
        $scope.goHome = function(){
            $state.go('user',{userId:UserService.user.user_id});
        }


        if(!session){
            $state.go('app');
        } else{
            UserService.updateUser({user_id:id,username:user});
            $scope.goHome();
        }

        console.log('app ready - ' , UserService.user )
    })

