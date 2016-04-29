/**
 * angular-common - Common functionalities shared across angular projects.
 * @version v1.0.2
 * @link https://github.com/LIVEauctioneers/angular-common#readme
 */
(function() {
	'use strict';

	angular.module('laac.common.route', ['ui.router']);

})();

(function() {
	'use strict';

	uiRouterHelper.$inject = ["$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider"];
	angular.module('laac.common.route')
	    .provider('uiRouterHelper', uiRouterHelper);

	function uiRouterHelper($urlRouterProvider, $locationProvider,
				$urlMatcherFactoryProvider) {
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
		}

		/*@ngInject*/
		function $get() { return new UIRouterHelper(); }

		function UIRouterHelper() {}
	}

})();

(function() {
	'use strict';

	urlParameterType.$inject = ["$urlMatcherFactoryProvider"];
	angular.module('laac.common.route')
	    .provider('urlParameterType', urlParameterType);

	function urlParameterType($urlMatcherFactoryProvider) {
		/*jshint validthis: true */
		var provider = this;
		provider.initialize = initialize;
		provider.register = registerUrlParameterType;
		provider.getTypes = getTypes;
		provider.$get = $get;

		var types = {};
		////////////////////////////////////

		function initialize() {
			angular.forEach(getTypes(), function(value, key) {
				$urlMatcherFactoryProvider.type(key, value);
			});
		}

		/*@ngInject*/
		function $get() { return new UrlParameterType(); }

		function UrlParameterType() {
			return {getTypes: getTypes, encode: encode};
		}

		function registerUrlParameterType(name, parameterDefinition) {
			types[name] = parameterDefinition;
		}

		function encode(parameterType, object) {
			return types[parameterType].encode(object);
		}

		function getTypes() { return types; }
	}

})();

(function() {
	'use strict';

	angular.module('laac.common.route')
	    .constant('URL_PARAMETER_TYPES', {
		    text: {
			    equals: function() {},
			    encode: function() {
				    // strip all non-alphanumeric characters,
				    // and toLowerCase()
			    },
			    is: angular.isString
		    }
	    });
})();
