
app_pack.requires.push('myApp.wolves');

angular.module('myApp.wolves',
        [
            'ui.router'
        ])
//    .config(function ($compileProvider){
//        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
//    })
    .config(function($stateProvider){

        /**
         * DEFINE PAGE STATES / URLS
         */
        $stateProvider
            .state('wolves',{
                url:'/wolves',
//            abstract:true,
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

                    }
                }
            })
            .state('wolves.detail',{
                url: '/:wolfId',
                views:{
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
                        template:'sdfg'
                    },
                    'center-content@' : {
                        template:
                            "<div>"+
                                "<wolf-banner></wolf-banner>"+
                                "<h4>Related Packs</h4>"+
                                "<div ng-repeat='pack in packs'><pack></pack></div>"+
                            "</div>",
                        controller:'WolfDetailCtrl'
                    }
                }
            })
            .state('wolves.detail.settings',{
                url: '/settings',
                views: {
                    'panel': {
                        templateUrl: "/ww-admin/assets/settings" ,
//                        controller: 'AssetSettingsCtrl'
                    }
                }
            })


    })

