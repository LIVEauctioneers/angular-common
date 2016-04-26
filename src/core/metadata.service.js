(function() {
    'use strict';

    angular.module('laac.common.core').service('metadata', metadata);

    function metadata() {
        var svc = {
            page: {
                title: '',
                description: '',
                canonical: ''
            }
        };

        return svc;
    }

})();
