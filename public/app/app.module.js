(function () {
    'use strict';

    var app = angular.module('app', [
        // Predefined modules.
        'ui.bootstrap',
        'ui.router',
        'ngResource',
        'ngRoute',

        // App components.
        'app.home',

        // App shared.
        'app.providers',
        'app.services'
    ]);
})();