(function () {
    'use strict';

    var appAdmin = angular.module('app.admin');

    //=========================================================================
    // Config.
    //=========================================================================
    appAdmin.config(Configuration);

    Configuration.$inject = ['$stateProvider'];

    function Configuration($stateProvider) {
        var routeRoleChecks = {
            admin: {
                auth: function (authService) {
                    return authService.authorizeCurrentUserForRoute('admin');
                }
            }
        };

        $stateProvider
            .state('app.userList', {
                url: '/user-list',
                templateUrl: '/partials/components/admin/userListView',
                controller: 'UserListCtrl',
                controllerAs: 'vm',
                resolve: routeRoleChecks.admin,
                title: 'User List',
                bodyCss: 'user-list'
            });
    }

    //=========================================================================
    // Run.
    //=========================================================================
    appAdmin.run(Run);

    Run.$inject = ['$rootScope', '$state'];

    function Run($rootScope, $state) {
        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
            if (error.notAuthorized) {
                $state.go('app.home');
            }
        });
    }
})();