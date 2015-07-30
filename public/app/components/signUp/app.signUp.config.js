(function () {
    'use strict';

    var appSignUp = angular.module('app.signUp');

    //=========================================================================
    // Config.
    //=========================================================================
    appSignUp.config(Configuration);

    Configuration.$inject = ['$stateProvider'];

    function Configuration($stateProvider) {
        $stateProvider
            .state('app.signUp', {
                url: '/sign-up',
                templateUrl: '/partials/components/signUp/signUpView',
                controller: 'SignUpCtrl',
                controllerAs: 'vm',
                title: 'Sign Up',
                bodyCss: 'sign-up'
            });
    }

})();