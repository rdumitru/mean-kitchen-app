(function () {
    'use strict';

    angular.module('app.services').factory('authService', AuthService);

    AuthService.$inject = ['$http', '$q', 'logger', 'identityService', 'UserResource'];

    function AuthService($http, $q, logger, identityService, UserResource) {
        //=====================================================================
        // Variables.
        //=====================================================================
        var notAuthorizedObj = { notAuthorized: true };

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

        function createUser(newUserData) {
            var deferred = $q.defer();
            var newUser = new UserResource(newUserData);

            newUser.$save()
                .then(function () {
                    identityService.currentUser = newUser;
                    deferred.resolve();
                })
                .catch(function (errorResponse) {
                    deferred.reject(errorResponse.data.reason);
                });

            return deferred.promise;
        }

        function updateCurrentUser(newUserData) {
            var deferred = $q.defer();

            var clone = angular.copy(identityService.currentUser);
            angular.extend(clone, newUserData);

            clone.$update()
                .then(function () {
                    identityService.currentUser = clone;
                    deferred.resolve();
                })
                .catch(function (errorResponse) {
                    deferred.reject(errorResponse.data.reason);
                });

            return deferred.promise;
        }

        function authorizeCurrentUserForRoute(role) {
            if (identityService.isAuthorized(role)) {
                return true;
            } else {
                return $q.reject(notAuthorizedObj);
            }
        }

        function authorizeAuthenticatedUserForRoute() {
            if (identityService.isAuthenticated()) {
                return true;
            } else {
                return $q.reject(notAuthorizedObj);
            }
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            authenticateUser: authenticateUser,
            logOutUser: logOutUser,
            createUser: createUser,
            updateCurrentUser: updateCurrentUser,
            authorizeCurrentUserForRoute: authorizeCurrentUserForRoute,
            authorizeAuthenticatedUserForRoute: authorizeAuthenticatedUserForRoute
        };
    }

})();