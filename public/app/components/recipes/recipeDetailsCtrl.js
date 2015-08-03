(function () {
    'use strict';

    angular.module('app.recipes').controller('RecipeDetailsCtrl', RecipeDetailsCtrl);

    RecipeDetailsCtrl.$inject = ['$scope', '$http', 'logger', '$stateParams', 'RecipeResource', 'identityService', 'notificationProvider'];

    function RecipeDetailsCtrl($scope, $http, logger, $stateParams, RecipeResource, identityService, notificationProvider) {
        var vm = this;

        //=====================================================================
        // Exposed functions.
        //=====================================================================
        vm.getIngredientDisplay = getIngredientDisplay;
        vm.toggleStar = toggleStar;
        vm.identity = identityService;

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

        function toggleStar() {
            var url = '/api/recipes/' + vm.recipe._id + '/toggle-star';
            var promise = $http.put(url, { star: !vm.recipe.isStarred() });

            promise
                .then(function (response) {
                    vm.recipe.starredByUsers = response.data.starredByUsers;
                })
                .catch(function (errorResponse) {
                    notificationProvider.error('Failed to update recipe.');
                });
        }
    }
})();