(function () {
    'use strict';

    angular.module('app.services').factory('authService', AuthService);

    AuthService.$inject = ['$http', '$q', 'logger', 'identityService'];

    function AuthService($http, $q, logger, identityService) {
        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            authenticateUser: authenticateUser
        };

        //=====================================================================
        // Public functions.
        //=====================================================================
        function authenticateUser(username, password) {
            var deferred = $q.defer();

            $http.post('/login', {
                username: username,
                password: password
            }).then(function (response) {
                // Save current user.
                identityService.currentUser = response.data.user;

                if (response.data.success) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        }
    }

})();