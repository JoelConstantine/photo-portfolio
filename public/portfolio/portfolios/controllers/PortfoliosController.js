angular.module('Portfolio.Portfolios')
	.controller('PortfoliosController',
	function($scope, PortfolioModel) {
		var portfolio = this;

		portfolio.portfolios = []

		portfolio.getAll = function() {
			PortfolioModel.all()
				.then(function(result) {
					console.log(result)
					portfolio.portfolios = (result !== 'null') ? result.data : {};
				})
		}

		portfolio.getAll();
	})