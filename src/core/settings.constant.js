(function(window) {
    'use strict';

    angular.module('laac.common.core').constant('SETTINGS', (window._laac || {}).settings || {});

})(window);
