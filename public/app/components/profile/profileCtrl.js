(function () {
    'use strict';

    angular.module('app.profile').controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$scope', 'logger', 'validation', 'authService', 'identityService', 'notificationProvider'];

    function ProfileCtrl($scope, logger, validation, authService, identityService, notificationProvider) {
        var vm = this;

        //=====================================================================
        // Exposed functions.
        //=====================================================================
        vm.getClass = validation.getClass;
        vm.update = update;

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(ProfileCtrl, init, 'Initializing...');

            // Update view.
            vm.email = identityService.currentUser.username;
            vm.firstName = identityService.currentUser.firstName;
            vm.lastName = identityService.currentUser.lastName;
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
        function update() {
            logger.debug(ProfileCtrl, update, 'Updating user profile...');
            vm.isLoading = true;

            var newUserData = {
                username: vm.email,
                firstName: vm.firstName,
                lastName: vm.lastName
            };

            if (vm.password && vm.password.length > 0) {
                newUserData.password = vm.password;
            }

            authService.updateCurrentUser(newUserData)
                .then(function () {
                    notificationProvider.success('Your user profile has been updated.');
                })
                .catch(function (reason) {
                    notificationProvider.error(reason);
                })
                .finally(function () {
                    vm.isLoading = false;
                });
        }
    }
})();