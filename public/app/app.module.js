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
        'app.recipes',

        // Admin components.
        'app.admin',
        'app.profile',
        'app.signUp',

        // App shared.
        'app.providers',
        'app.services',
        'app.resources'
    ]);
})();