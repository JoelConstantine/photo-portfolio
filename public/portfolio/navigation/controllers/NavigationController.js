angular.module('Portfolio.Navigation')
	.controller('NavigationCtrl',
		function($scope, NavigationModel) {
			var navigation = this;

			navigation.pages = [];

			navigation.getNavigation = function() {
				navigation.pages = NavigationModel.all();
				console.log(navigation.pages);
			}

			navigation.getNavigation();	
		});