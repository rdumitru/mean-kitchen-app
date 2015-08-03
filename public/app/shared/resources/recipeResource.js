(function () {
    'use strict';

    angular.module('app.resources').factory('RecipeResource', RecipeResource);

    RecipeResource.$inject = ['$resource', 'identityService'];

    function RecipeResource($resource, identityService) {
        //=====================================================================
        // Resource.
        //=====================================================================
        var RecipeRes = $resource('/api/recipes/:_id', { _id: '@id' }, {
            update: { method: 'PUT', isArray: false }
        });

        RecipeRes.prototype.isStarred = function () {
            return identityService.currentUser && this.starredByUsers.indexOf(identityService.currentUser._id) >= 0;
        };

        return RecipeRes;
    }

})();