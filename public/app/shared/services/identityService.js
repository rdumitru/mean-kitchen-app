(function () {
    'use strict';

    angular.module('app.services').factory('identityService', IdentityService);

    IdentityService.$inject = ['$window', 'logger', 'UserResource'];

    function IdentityService($window, logger, UserResource) {
        //=====================================================================
        // Handle bootstrapped current user object.
        //=====================================================================
        var currentUser = null;

        if (!!$window.bootstrappedUserObject) {
            currentUser = new UserResource();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }

        //=====================================================================
        // Public functions.
        //=====================================================================
        function isAuthenticated() {
            return !!this.currentUser;
        }

        function isAuthorized(role) {
            return !!this.currentUser && this.currentUser.roles.indexOf(role) >= 0;
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            currentUser: currentUser,
            isAuthenticated: isAuthenticated,
            isAuthorized: isAuthorized
        };
    }

})();