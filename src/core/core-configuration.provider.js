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
