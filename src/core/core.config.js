(function() {
    'use strict';

    angular.module('laac.common.core').config(config);

    // automatically perform deafult configurations in module for now
    function config($httpProvider) {
        $httpProvider.interceptors.push('coreHttpInterceptor');
    }
})();
