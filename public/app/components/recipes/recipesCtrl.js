(function () {
    'use strict';

    angular.module('app.recipes').controller('RecipesCtrl', RecipesCtrl);

    RecipesCtrl.$inject = ['$scope', 'logger', 'RecipeResource'];

    function RecipesCtrl($scope, logger, RecipeResource) {
        var vm = this;

        //=====================================================================
        // Constants.
        //=====================================================================
        vm.pageNumber = 1;
        vm.pageSize = 10;
        vm.debounce = { debounce: 300 };

        //=====================================================================
        // Exposed functions.
        //=====================================================================
        vm.getFiltered = getFiltered;
        vm.update = update;
        vm.getMainIngredientsStr = getMainIngredientsStr;

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(RecipesCtrl, init, 'Initializing...');
            RecipeResource.query(function (data) {
                vm.recipes = _.sortBy(data, 'name');
                vm.update();
            });
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
        function getFiltered() {
            var lowerCaseSearch = vm.search ? vm.search.toLowerCase() : null;

            var result = _.filter(vm.recipes, function (recipe) {
                var searchResult = !vm.search
                    || recipe.name.toLowerCase().indexOf(lowerCaseSearch) >= 0
                    || _.filter(recipe.ingredients, function (ingredient) {
                        return ingredient.name.toLowerCase().indexOf(lowerCaseSearch) >= 0;
                    }).length > 0;

                var maxTimeResult = !vm.maxTime || recipe.time <= vm.maxTime;

                return searchResult && maxTimeResult;
            });

            return result;
        }

        function update() {
            vm.filteredRecipes = getFiltered();

            // Calculate page.
            vm.startIndex = Math.max((vm.pageNumber - 1) * vm.pageSize, 0);
            vm.endIndex = Math.min(vm.pageNumber * vm.pageSize, vm.filteredRecipes.length);
            vm.pagedRecipes = vm.filteredRecipes.slice(vm.startIndex, vm.endIndex);
        }

        function getMainIngredientsStr(ingredients) {
            var mainIngredients = _.filter(ingredients, function (ingredient) {
                return ingredient.isMain;
            });

            var names = _.map(mainIngredients, function (ingredient) {
                if (!isNaN(ingredient.quantity)) {
                    return ingredient.name.trim() + 's';
                }

                return ingredient.name.trim();
            });

            var joinedStr = names.join(', ');
            if (joinedStr.length > 0) {
                joinedStr = joinedStr[0].toUpperCase() + joinedStr.slice(1);
                joinedStr += '.';
            }

            return joinedStr;
        }
    }
})();