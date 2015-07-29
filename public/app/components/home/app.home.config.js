(function () {
    'use strict';

    angular.module('app.home').config(Configuration);

    Configuration.$inject = ['$stateProvider'];

    function Configuration($stateProvider) {
        $stateProvider
            .state('app.home', {
                url: '/home',
                templateUrl: '/partials/components/home/homeView',
                controller: 'HomeCtrl',
                controllerAs: 'vm',
                title: 'Home',
                bodyCss: 'home'
            });
    }

})();