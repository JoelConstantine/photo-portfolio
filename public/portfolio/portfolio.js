var portfolio = angular.module('Portfolio', [
		'ngRoute'
	]);

portfolio.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'portfolio/homepage/temp/homepage.html'
		})

})