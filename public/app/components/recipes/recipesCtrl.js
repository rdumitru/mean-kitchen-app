(function () {
    'use strict';

    angular.module('app.recipes').controller('RecipesCtrl', RecipesCtrl);

    RecipesCtrl.$inject = ['$scope', 'logger', 'RecipeResource'];

    function RecipesCtrl($scope, logger, RecipeResource) {
        var vm = this;

        //=====================================================================
        // Exposed functions.
        //=====================================================================

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            vm.recipes = RecipeResource.query();
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
    }
})();