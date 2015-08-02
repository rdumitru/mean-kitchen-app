(function () {
    'use strict';

    angular.module('app.recipes').config(Configuration);

    Configuration.$inject = ['$stateProvider'];

    function Configuration($stateProvider) {
        $stateProvider
            .state('app.recipes', {
                url: '/recipes',
                templateUrl: '/partials/components/recipes/recipesView',
                controller: 'RecipesCtrl',
                controllerAs: 'vm',
                title: 'Recipes',
                bodyCss: 'recipes'
            })
            .state('app.recipeDetails', {
                url: '/recipe/:id',
                templateUrl: '/partials/components/recipes/recipeDetailsView',
                controller: 'RecipeDetailsCtrl',
                controllerAs: 'vm',
                title: 'Recipe Details',
                bodyCss: 'recipe-details'
            });
    }

})();