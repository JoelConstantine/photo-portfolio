angular.module('Portfolio.Common')
	.service('EndpointService', function() {
		var service=this,
			endpoint = { URI: '/', root: 'api/'};

		service.getUrl = function(model) {
			return endpoint.URI + endpoint.root + model;
		}

		service.getUrlForSlug = function(model, slug) {
			return service.getUrl(model) + slug
		}
	});