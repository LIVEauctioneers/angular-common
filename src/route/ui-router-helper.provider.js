(function() {
	'use strict';

	angular.module('laac.common.route')
	    .provider('uiRouterHelper', uiRouterHelper);

	function uiRouterHelper($urlRouterProvider, $locationProvider,
				$urlMatcherFactoryProvider,
				urlParameterTypeProvider) {
		/*jshint validthis: true */
		var provider = this;
		provider.config = config;
		provider.$get = $get;

		// performs common configurations
		function config() {
			$urlRouterProvider.otherwise('/');
			$locationProvider.html5Mode(true).hashPrefix('!');
			$urlMatcherFactoryProvider.caseInsensitive(true);
			$urlMatcherFactoryProvider.strictMode(false);
			angular.forEach(urlParameterTypeProvider.getTypes(),
					function(value, key) {
						$urlMatcherFactoryProvider.type(
						    key, value);
					});
		}

		/*@ngInject*/
		function $get() { return new UIRouterHelper(); }

		function UIRouterHelper() {}
	}

})();
