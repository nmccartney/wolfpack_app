
app_pack.requires.push('myApp.packs');

angular.module('myApp.packs',
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
            .state('packs',{
                url:'/packs',
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
                    } ,
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
            .state('packs.detail',{
                url: '/:packId',
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
                                "<pack-banner></pack-banner>"+
                                "<pack-chat></pack-chat>"+
                            "</div>",
                        controller: ''
                    }
                }
            })
            .state('packs.detail.settings',{
                url: '/settings',
                views: {
                    'panel': {
                        templateUrl: "/ww-admin/assets/settings" ,
//                        controller: 'AssetSettingsCtrl'
                    }
                }
            })


    })

