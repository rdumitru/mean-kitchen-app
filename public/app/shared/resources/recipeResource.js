(function () {
    'use strict';

    angular.module('app.resources').factory('RecipeResource', RecipeResource);

    RecipeResource.$inject = ['$resource'];

    function RecipeResource($resource) {
        //=====================================================================
        // Resource.
        //=====================================================================
        var RecipeRes = $resource('/api/recipes/:_id', { _id: '@id' }, {
            update: { method: 'PUT', isArray: false }
        });

        RecipeRes.prototype.temp = function () {

        };

        return RecipeRes;
    }

})();