(function () {
    'use strict';

    angular.module('app.recipes').controller('RecipeDetailsCtrl', RecipeDetailsCtrl);

    RecipeDetailsCtrl.$inject = ['$scope', 'logger', '$stateParams', 'RecipeResource'];

    function RecipeDetailsCtrl($scope, logger, $stateParams, RecipeResource) {
        var vm = this;

        //=====================================================================
        // Exposed functions.
        //=====================================================================
        vm.getIngredientDisplay = getIngredientDisplay;

        //=====================================================================
        // Initialization.
        //=====================================================================
        init();

        function init() {
            logger.debug(RecipeDetailsCtrl, init, 'Initializing...');

            RecipeResource.get({ _id: $stateParams.id }, function (data) {
                vm.recipe = data;
            });
        }

        //=====================================================================
        // Exposed functions implementation.
        //=====================================================================
        function getIngredientDisplay(ingredient) {
            var quantityStr = ingredient.quantity.trim();
            var nameStr = ingredient.name.trim();

            if (!isNaN(ingredient.quantity)) {
                quantityStr += ' x ';
                if (ingredient.quantity > 1) {
                    nameStr += 's';
                }
            } else {
                quantityStr += ' of '
            }

            return quantityStr + nameStr;
        }
    }
})();