(function() {
    'use strict';

    angular.module('laac.common.core').provider('coreConfiguration', coreConfiguration);

    function coreConfiguration() {
        var provider = {
            registerAPI: registerAPI,
            $get: $get
        };
        /*jshint validthis: true */
        angular.extend(this, provider);

        ///////////////////////////////////
        var apis = {};
        //////////////////////////////////

        function registerAPI(name, api) {
            apis[name] = api;
            /*"api": {
                "path" : "",
                "requestClient" : "",
                "requestVersion" : ""
            }*/
        }

        function $get() {
            var svc = {
                apis: apis
            };
            return svc;
        }
    }

})();
