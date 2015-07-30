(function () {
    'use strict';

    angular.module('app.signUp').controller('SignUpCtrl', SignUpCtrl);

    SignUpCtrl.$inject = ['$scope', '$state', 'logger', 'notificationProvider', 'validation', 'authService'];

    function SignUpCtrl($scope, $state, logger, notificationProvider, validation, authService) {
        var vm = this;

        //=====================================================================
        // Exposed functions.
        //=====================================================================
        vm.getClass = validation.getClass;
        vm.signUp = signUp;

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(SignUpCtrl, init, 'Initializing...');
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
        function signUp() {
            logger.debug(SignUpCtrl, signUp, 'Submitting form...');
            vm.isLoading = true;

            var newUserData = {
                username: vm.email,
                password: vm.password,
                firstName: vm.firstName,
                lastName: vm.lastName
            };

            authService.createUser(newUserData)
                .then(function () {
                    notificationProvider.success('User successfully created.');
                    $state.go('app.home');
                })
                .catch(function (errorResponse) {
                    notificationProvider.error(errorResponse);
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        }
    }
})();