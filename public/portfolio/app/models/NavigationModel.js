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
							'name' : 'Portraits',
							'slug' : '/portraits-1'
						},
						{ 
							'name' : 'Travel',
							'slug' : '/travel'
						},
						]
					}
				]
			};
		});