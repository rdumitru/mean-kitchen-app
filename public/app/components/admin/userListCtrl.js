(function () {
    'use strict';

    angular.module('app.admin').controller('UserListCtrl', UserListCtrl);

    UserListCtrl.$inject = ['$scope', 'logger', 'UserResource'];

    function UserListCtrl($scope, logger, UserResource) {
        var vm = this;

        init();

        function init() {
            logger.debug(UserListCtrl, init, 'Initializing...');
            vm.users = UserResource.query();
        }
    }
})();