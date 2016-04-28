(function() {
	'use strict';

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
