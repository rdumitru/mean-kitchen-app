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
            });
    }

})();