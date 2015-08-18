angular.module('Portfolio.Portfolios')
	.controller('PortfolioController', 
	function(PortfolioModel, $routeParams) {
		var portfolio = this;

		portfolio.slug = $routeParams['slug'];
		portfolio.portfolio = {};

		console.log($routeParams);

		portfolio.getPortfolio = function(slug) {
			console.log(slug)
			PortfolioModel.fetch(slug)
				.then(function(result){
					portfolio.portfolio = result.data;
				})
		}

		portfolio.getPortfolio(portfolio.slug);
	});