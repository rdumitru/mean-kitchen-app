(function () {
    'use strict';

    var app = angular.module('app');

    app.config(Configuration);

    Configuration.$inject = ['$logProvider', '$routeProvider', '$locationProvider'];

    function Configuration($logProvider, $routeProvider, $locationProvider) {
        // Logging.
        $logProvider.debugEnabled(true);

        // HTML5 mode.
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        // Routes.
        var defaultCtrlAs = 'vm';
        $routeProvider
            .when('/', {
                templateUrl: '/partials/components/main/main',
                controller: 'MainCtrl',
                controllerAs: defaultCtrlAs
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