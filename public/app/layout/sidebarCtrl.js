(function () {
    'use strict';

    angular.module('app').controller('SidebarCtrl', SidebarCtrl);

    SidebarCtrl.$inject = ['logger'];

    function SidebarCtrl(logger) {
        var vm = this;

        init();

        function init() {
            logger.debug(SidebarCtrl, init, 'Initializing...');
            vm.test = 'test string';
        }

    }
})();