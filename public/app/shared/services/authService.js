(function () {
    'use strict';

    angular.module('app.services').factory('authService', AuthService);

    AuthService.$inject = ['$http', '$q', 'logger', 'identityService', 'UserResource'];

    function AuthService($http, $q, logger, identityService, UserResource) {
        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            authenticateUser: authenticateUser,
            logOutUser: logOutUser,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute
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
                if (response.data.success) {
                    var user = new UserResource();
                    angular.extend(user, response.data.user);

                    // Save current user.
                    identityService.currentUser = user;

                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });

            return deferred.promise;
        }

        function logOutUser() {
            var deferred = $q.defer();

            $http.post('/logout', { logOut: true })
                .then(function () {
                    identityService.currentUser = null;
                    deferred.resolve();
                });

            return deferred.promise;
        }

        function authorizeCurrentUserForRoute(role) {
            if (identityService.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject({ notAuthorized: true });
            }
        }
    }

})();