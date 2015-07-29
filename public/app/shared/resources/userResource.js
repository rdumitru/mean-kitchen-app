(function () {
    'use strict';

    angular.module('app.resources').factory('UserResource', UserResource);

    UserResource.$inject = ['$resource'];

    function UserResource($resource) {
        //=====================================================================
        // Resource.
        //=====================================================================
        var UserRes = $resource('/api/users/:id', {_id: '@id'});

        UserRes.prototype.isAdmin = function () {
            return this.roles && this.roles.indexOf('admin') >= 0;
        };

        return UserRes;
    }

})();