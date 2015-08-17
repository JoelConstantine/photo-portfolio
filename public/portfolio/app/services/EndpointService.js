angular.module('Portfolio.Common')
	.service('EndpointService', function() {
		var service=this,
			endpoint = { URI: '/', root: 'api/'};

		service.getURL = function(model) {
			return endpoint.URI + root + model;
		}

		service.getUrlForSlug = function(model, slug) {
			return service.getUrl(model) + slug
		}
	});