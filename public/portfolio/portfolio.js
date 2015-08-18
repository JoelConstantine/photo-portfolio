var portfolio = angular.module('Portfolio', [
		'ngRoute',
		'Portfolio.Common',
		'Portfolio.Navigation',
		'Portfolio.Portfolios'
	]);

portfolio.config(function($routeProvider, $locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'portfolio/homepage/temp/homepage.html'
		})
		.when('/portfolios', {
			templateUrl: 'portfolio/portfolios/temp/portfolio.html',
			controller: 'PortfoliosController',
			controllerAs: 'portfolios'
		})
		.when('/portfolios/:slug', {
			templateUrl: '/portfolio/portfolios/temp/single-portfolio.html',
			controller: 'PortfolioController',
			controllerAs: 'portfolio'
		})
		.otherwise({redirectTo: '/'});

})