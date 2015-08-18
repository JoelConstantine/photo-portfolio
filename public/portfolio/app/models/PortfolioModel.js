angular.module("Portfolio.Common")
	.service("PortfolioModel", 
	function($http, EndpointService) {
		var service = this,
			MODEL = 'portfolios/';

		service.all = function() {

			return $http.get(EndpointService.getUrl( MODEL ));
		}

		service.fetch = function(portfolio_slug) {
			return $http.get(
				EndpointService.getUrlForSlug( MODEL, portfolio_slug )
			);
		}
	});