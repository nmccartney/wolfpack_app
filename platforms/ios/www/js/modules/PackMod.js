
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
                            "<navigation id='header-nav'>"+
                                "<button snap-toggle>Toggle Left</button>"+
                                "<button ng-click='goHome()'>Home</button>"+
                                "<button snap-toggle='right'>Toggle Right</button>"+
                                "</navigation>"

                    }
                }
            })
            .state('packs.detail',{
                url: '/:packId',
                views:{
                    'center-header-nav':{
                        template:
                            "<navigation id='header-nav'>"+
                                "<button snap-toggle>Toggle Left packs</button>"+
                                "<button snap-toggle='right'>Toggle Right packs</button>"+
                                "</navigation>"

                    },
                    'center-footer-nav':{
                        template:'sdfg'
                    },
                    'center-content@' : {
                        template:
                            "<div>"+
                                "<pack-banner></pack-banner>"+
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

