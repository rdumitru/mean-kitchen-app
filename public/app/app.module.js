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
        'app.admin',
        'app.profile',
        'app.signUp',

        // App shared.
        'app.providers',
        'app.services',
        'app.resources'
    ]);
})();