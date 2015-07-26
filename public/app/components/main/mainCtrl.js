(function () {
    'use strict';

    angular.module('app.main').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['$scope', 'logger'];

    function MainCtrl($scope, logger) {
        var vm = this;

        init();

        function init() {
            logger.log(MainCtrl, init, 'Initializing...');

            vm.recipes = [];

            for (var i = 1; i <= 20; i++) {
                vm.recipes.push({
                    name: 'name ' + i,
                    featured: (i % 2 === 0),
                    published: new Date()
                });
            }
        }
    }
})();