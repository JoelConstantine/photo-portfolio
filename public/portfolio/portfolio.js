var portfolio = angular.module('Portfolio', [
		'ngRoute',
		'Portfolio.Common',
		'Portfolio.Navigation'
	]);

portfolio.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'portfolio/homepage/temp/homepage.html'
		})

})