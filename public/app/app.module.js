(function () {
    'use strict';

    var app = angular.module('app', [
        // Predefined modules.
        'ui.bootstrap',
        'ui.router',
        'ngResource',
        'ngRoute',

        // App components.
        'app.main',

        // App shared.
        'app.providers'
    ]);
})();