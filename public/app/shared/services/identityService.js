(function () {
    'use strict';

    angular.module('app.services').factory('identityService', IdentityService);

    IdentityService.$inject = ['logger'];

    function IdentityService(logger) {
        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            currentUser: null,
            isAuthenticated: isAuthenticated
        };

        //=====================================================================
        // Public functions.
        //=====================================================================
        function isAuthenticated() {
            return !!this.currentUser;
        }
    }

})();