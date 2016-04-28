(function() {
	'use strict';

	angular.module('laac.common.route')
	    .provider('urlParameterType', urlParameterType);

	function urlParameterType() {
		var provider = {
			register: registerUrlParameterType,
			getTypes: getTypes,
			$get: $get
		};
		/*jshint validthis: true */
		angular.extend(this, provider);

		var svc = {getTypes: getTypes, encode: encode};
		////////////////////////////////////

		var types = {};
		// TODO: annotate for ngInject
		function $get() { return svc; }

		function registerUrlParameterType(name, parameterDefinition) {
			types[name] = parameterDefinition;
		}

		function encode(parameterType, object) {
			return types[parameterType].encode(object);
		}

		function getTypes() { return types; }
	}

})();
