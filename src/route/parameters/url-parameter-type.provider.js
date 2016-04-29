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
