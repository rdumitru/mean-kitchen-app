(function () {
    'use strict';

    angular.module('app').controller('FooterCtrl', FooterCtrl);

    FooterCtrl.$inject = ['logger'];

    function FooterCtrl(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(FooterCtrl, init, 'Initializing...');
        }

    }
})();