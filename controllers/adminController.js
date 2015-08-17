var express = require('express');
var passport = require('passport');

var AdminController = {
	Index : function(req,res) {
		console.log("Rendering index");
		res.render('admin/index', {
			'sections' : [
				{
					'name' : 'Photos',
					'url' : '/admin/photos'
				},
				{
					'name' : 'Portfolios',
					'url' : '/admin/portfolios'
				},
			]
		});
	}
};

module.exports = AdminController;