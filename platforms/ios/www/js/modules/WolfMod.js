
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
                            "<navigation id='header-nav'>"+
                                "<button snap-toggle>Toggle Left</button>"+
                                "<button ng-click='goHome()'>Home</button>"+
                                "<button snap-toggle='right'>Toggle Right</button>"+
                                "</navigation>"

                    }
                }
            })
            .state('wolves.detail',{
                url: '/:wolfId',
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

