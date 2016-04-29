/**
 * angular-common - Common functionalities shared across angular projects.
 * @version v1.0.2
 * @link https://github.com/LIVEauctioneers/angular-common#readme
 */
(function() {
	'use strict';

	angular.module('laac.common.core', []);

})();

(function() {
	'use strict';

	angular.module('laac.common.route', ['ui.router']);

})();

(function() {
	'use strict';

	angular.module('laac.common.core')
	    .provider('coreConfiguration', coreConfiguration);

	function coreConfiguration() {
		/*jshint validthis: true */
		var provider = this;
		provider.registerAPI = registerAPI;
		provider.$get = $get;

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

		/*@ngInject*/
		function $get() { return new CoreConfiguration(); }

		function CoreConfiguration() { return {apis: apis}; }
	}

})();

(function() {
	'use strict';

	coreHttpInterceptor.$inject = ["$q", "coreConfiguration"];
	angular.module('laac.common.core')
	    .service('coreHttpInterceptor', coreHttpInterceptor);

	function coreHttpInterceptor($q, coreConfiguration) {
		var interceptor = {request: onRequest};
		return interceptor;

		function onRequest(config) {
			// TODO
			// for each registered api, append requestClient if
			// available, append
			// requestVersion if available

			for (var i = 0, l = coreConfiguration.apis.length;
			     i < l; i++) {
				var api = coreConfiguration.apis[i];
				if (config.url.indexOf(api.path) === 0) {
					config.headers = config.headers || {};
					config.headers['X-Client'] =
					    api.requestClient;
					config.headers['X-Version'] =
					    api.requestVersion;
					break;
				}
			}

			return config;
		}
	}
})();

(function() {
	'use strict';

	angular.module('laac.common.core').service('metadata', metadata);

	function metadata() {
		var svc = {page: {title: '', description: '', canonical: ''}};

		return svc;
	}

})();

(function() {
	'use strict';

	uiRouterHelper.$inject = ["$urlRouterProvider", "$locationProvider", "$urlMatcherFactoryProvider", "urlParameterTypeProvider"];
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

(function() {
	'use strict';

	angular.module('laac.common.route')
	    .provider('urlParameterType', urlParameterType);

	function urlParameterType() {
		/*jshint validthis: true */
		var provider = this;
		provider.register = registerUrlParameterType;
		provider.getTypes = getTypes;
		provider.$get = $get;

		var types = {};
		////////////////////////////////////


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
