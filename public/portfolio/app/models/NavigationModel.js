angular.module('Portfolio.Common')
	.service('NavigationModel',
		function($http) {
			var navigation = this,
				MODEL = '/portfolios/';

			navigation.all = function() {
				return [
					{
					'name' : 'About',
					'slug' : '/about',
					'subs' : []
					},
					{
					'name' : 'Portfolios',
					'slug' : '/portfolios',
					'subs' : [
						{ 
							'name' : 'Portraits 1',
							'slug' : '/portraits-1'
						},
						{ 
							'name' : 'Portraits 2',
							'slug' : '/portfolio-2'
						},
						]
					}
				]
			};
		});