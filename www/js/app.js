'use strict';




// Declare app level module which depends on filters, and services
var app_pack = angular.module('myApp', [
//        'ajoslin.mobile-navigate',
//        'ngMobile',
        'ngResource',
        "google-maps",
        'snap',
        'ui.router' ,
        'LocalStorageModule',
        'phonegap',
        'btford.socket-io'
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
                                "<button ng-click='logout()'>Not {{user.username}}?</button>"+
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
                            "<navigation id='header-nav' class='bar bar-header'>"+
                                "<div class='tabs tabs-icon-only'>"+
                                    "<a snap-toggle class='tab-item'><i class='icon ion-star'></i></a>" +
                                    "<a ng-click='goHome()' class='tab-item'><i class='icon ion-home'></i></a>" +
                                    "<a snap-toggle='right'  class='tab-item'><i class='icon ion-navicon'></i></a>" +
                                "</div>"+
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


