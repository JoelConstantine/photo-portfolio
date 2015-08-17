var express = require('express');
var passport = require('passport');
var portfolioModel = require('../models/portfolioModel');
var photoModel = require('../models/photoModel');
var db_table = 'portfolios';

var portfolioController = {
	Index : function(req,res) {
		var portfolios = portfolioModel.getAll(req);

		portfolios.on("success", function(data) {
			res.render('admin/portfolios', {
		  		'title' : "Portfolios",
		  		'portfolios' : data
		  	});
		});
	},
	viewPortfolio: function(req,res) {
		var portfolio = portfolioModel.findBySlug(req);

		portfolio.on("success", function(data) {
	    var photos = photoModel.findByPortfolio(req, data);

	    photos.on("success", function(doc) {
	      var returnPortfolio = data;
	      returnPortfolio.photos = doc;
	      
	      res.render('admin/viewportfolio', {
	      	'title' : portfolio.name,
	      	'portfolio' : returnPortfolio
	      });
	    });
	  });
	},
	newPhoto: function(req,res) {
		
	},
	AddPhoto: function(req,res) {
		var portfolio = portfolioModel.addPhoto(req);

		portfolio.on('success', function(data) {
			res.redirect('/admin/portfolios/' + req.params.slug);
		});	
	},
	deletePhoto: function(req, id) {

	}
}

module.exports = portfolioController;