(function () {
    'use strict';

    angular.module('app').controller('NavCtrl', NavCtrl);

    NavCtrl.$inject = ['logger', '$http', 'notificationProvider', 'identityService', 'authService'];

    function NavCtrl(logger, $http, notificationProvider, identityService, authService) {
        var vm = this;

        //=====================================================================
        // Expose functions.
        //=====================================================================
        vm.logIn = logIn;

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(NavCtrl, init, 'Initializing...');
            vm.identity = identityService;
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
        function logIn() {
            logger.debug(NavCtrl, logIn, 'Signing in...');

            authService.authenticateUser(vm.username, vm.password)
                .then(function (success) {
                    if (success) {
                        notificationProvider.success('You have successfully logged in!');
                    } else {
                        notificationProvider.error('Invalid user name or password!');
                    }
                });
        }

    }
})();