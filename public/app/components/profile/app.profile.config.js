(function () {
    'use strict';

    angular.module('app.profile').config(Configuration);

    Configuration.$inject = ['$stateProvider'];

    function Configuration($stateProvider) {
        var routeRoleChecks = {
            user: {
                auth: function (authService) {
                    return authService.authorizeAuthenticatedUserForRoute();
                }
            }
        };

        $stateProvider
            .state('app.profile', {
                url: '/profile',
                templateUrl: '/partials/components/profile/profileView',
                controller: 'ProfileCtrl',
                controllerAs: 'vm',
                resolve: routeRoleChecks.user,
                title: 'Profile',
                bodyCss: 'profile'
            });
    }

})();