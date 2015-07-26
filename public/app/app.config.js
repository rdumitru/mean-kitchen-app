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
        $routeProvider
            .when('/', {
                templateUrl: '/partials/main',
                controller: 'MainCtrl'
            });
    }

    // Add extra properties to each state.
    app.run(['$rootScope', function ($rootScope) {
        $rootScope.$on('$stateChangeSuccess', function (event, current) {
            $rootScope.title = current.title;
            $rootScope.bodyCss = current.bodyCss;
        });
    }]);

    // TODO remove.
    app.controller('MainCtrl', function ($scope) {
        console.log('In MainCtrl...');
        $scope.myVar = 'Hello Angular!';
    });

})();