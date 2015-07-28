(function () {
    'use strict';

    angular.module('app').controller('ContentCtrl', ContentCtrl);

    ContentCtrl.$inject = ['logger'];

    function ContentCtrl(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(ContentCtrl, init, 'Initializing...');
        }

    }
})();