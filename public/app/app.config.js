(function () {
    'use strict';

    var app = angular.module('app');

    app.config(Configuration);

    Configuration.$inject = ['$logProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function Configuration($logProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
        // Logging.
        $logProvider.debugEnabled(true);

        // HTML5 mode.
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Always default to home page.
        $urlRouterProvider.otherwise('/app/home');

        // Routes.
        var defaultCtrlAs = 'vm';
        var mainViewsObj = {
            nav: {
                templateUrl: '/partials/layout/navTmpl',
                controller: 'NavCtrl',
                controllerAs: defaultCtrlAs
            },
            '': {
                templateUrl: '/partials/layout/contentTmpl',
                controller: 'ContentCtrl',
                controllerAs: defaultCtrlAs
            },
            sidebar: {
                templateUrl: '/partials/layout/sidebarTmpl',
                controller: 'SidebarCtrl',
                controllerAs: defaultCtrlAs
            },
            footer: {
                templateUrl: '/partials/layout/footerTmpl',
                controller: 'FooterCtrl',
                controllerAs: defaultCtrlAs
            }
        };

        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                views: mainViewsObj
            });
    }

    // Add extra properties to each state.
    app.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, current) {
            $rootScope.title = current.title;
            $rootScope.bodyCss = current.bodyCss;
        });
    }]);

})();