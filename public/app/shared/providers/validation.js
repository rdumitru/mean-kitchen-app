(function () {
    'use strict';

    angular.module('app.providers').factory('validation', Validation);

    Validation.$inject = [];

    function Validation() {
        //=====================================================================
        // Exposed functions.
        //=====================================================================
        function hasError(form, formElement) {
            return form.$submitted && formElement.$invalid;
        }

        function hasWarn(form, formElement) {
            return !form.$submitted && formElement.$dirty && formElement.$invalid;
        }

        function hasSuccess(formElement) {
            return formElement.$dirty && !formElement.$invalid;
        }

        function getClass(form, formElement) {
            return {
                'has-error': hasError(form, formElement),
                'has-warning': hasWarn(form, formElement),
                'has-success': hasSuccess(formElement)
            };
        }

        //=====================================================================
        // Expose functions.
        //=====================================================================
        return {
            hasError: hasError,
            hasWarn: hasWarn,
            hasSuccess: hasSuccess,
            getClass: getClass
        };
    }

})();