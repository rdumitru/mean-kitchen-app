(function () {
    'use strict';

    angular.module('app.home').controller('HomeCtrl', HomeCtrl);

    HomeCtrl.$inject = ['$scope', 'logger'];

    function HomeCtrl($scope, logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(HomeCtrl, init, 'Initializing...');
        }
    }
})();