
(function () {
    'use strict';

    angular.module('app.providers').value('toastr', toastr);
    angular.module('app.providers').factory('notificationProvider', NotificationProvider);

    NotificationProvider.$inject = ['toastr', 'logger'];

    function NotificationProvider(toastr, logger) {
        //=====================================================================
        // Toastr options.
        //=====================================================================
        toastr.options = {
            closeButton: false,
            debug: false,
            newestOnTop: false,
            progressBar: false,
            positionClass: 'toast-top-center',
            preventDuplicates: false,
            onclick: null,
            showDuration: 500,
            hideDuration: 1000,
            timeOut: 2000,
            extendedTimeOut: 1000,
            showEasing: 'swing',
            hideEasing: 'linear',
            showMethod: 'fadeIn',
            hideMethod: 'fadeOut'
        };

        //=====================================================================
        // Public functions.
        //=====================================================================
        function success(msg) {
            toastr.success(msg);
            logger.debug(NotificationProvider, success, msg);
        }

        function info(msg) {
            toastr.info(msg);
            logger.debug(NotificationProvider, info, msg);
        }

        function warning(msg) {
            toastr.warning(msg);
            logger.debug(NotificationProvider, warning, msg);
        }

        function error(msg) {
            toastr.error(msg);
            logger.debug(NotificationProvider, error, msg);
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            success: success,
            info: info,
            warning: warning,
            error: error
        };
    }

})();