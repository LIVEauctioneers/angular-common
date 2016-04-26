(function() {
    'use strict';

    angular.module('laac.common.core').service('coreHttpInterceptor', coreHttpInterceptor);

    function coreHttpInterceptor($q, coreConfiguration) {
        var interceptor = {
            request: onRequest
        };
        return interceptor;

        function onRequest(config) {
            // TODO
            config.headers = config.headers || {};
            // for each registered api, append requestClient if available, append requestVersion if available
            config.headers["X-Client"] = coreConfiguration
            config.headers["X-Version"]
                // let Cort know these names and confirm if we need changes
            config.headers = angular.extend(config.headers, {
                "X-Request-Client": "test"
            });
            return config;
        }
    }
})();
