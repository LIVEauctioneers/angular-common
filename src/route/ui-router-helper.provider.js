(function() {
  'use strict';

  angular.module('laac.common.route')
      .provider('uiRouterHelper', uiRouterHelper);

  function uiRouterHelper($urlRouterProvider, $locationProvider,
                          $urlMatcherFactoryProvider,
                          urlParameterTypeProvider) {
    var provider = {config: config, $get: $get};
    /*jshint validthis: true */
    angular.extend(this, provider);

    // performs common configurations
    function config() {
      $urlRouterProvider.otherwise('/');
      $locationProvider.html5Mode(true).hashPrefix('!');
      $urlMatcherFactoryProvider.caseInsensitive(true);
      $urlMatcherFactoryProvider.strictMode(false);
      angular.forEach(urlParameterTypeProvider.getTypes(),
                      function(value, key) {
                        $urlMatcherFactoryProvider.type(key, value);
                      });
    }

    // TODO: annotate for ngInject
    function $get() { return {}; }
  }


})();
