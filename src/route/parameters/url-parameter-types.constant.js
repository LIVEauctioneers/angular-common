(function() {
    'use strict';

    angular.module('laac.common.route').constant('URL_PARAMETER_TYPES', {
        text: {
            equals: function() {},
            encode: function() {
                // strip all non-alphanumeric characters, and toLowerCase()
            },
            is: angular.isString
        }
    });
})();
