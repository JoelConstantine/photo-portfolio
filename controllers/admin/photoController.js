var express = require('express');
var passport = require('passport');
var photoModel = require('../../models/photoModel');
var db_table = 'mediafile';

var photoController = {
	Index : function(req,res) {
		var photos = photoModel.getAll(req);

		photos.on("success", function(data) {
			res.render('admin/managephotos', {
		  		'title' : "Photos",
		  		'photos' : data
		  	});
		});
	},
	newPhoto: function(req,res) {
		res.render('admin/newphoto', {title:'Add New Photo'});
	},
	addPhoto: function(req,res) {
		// Grab the DB
		var db = req.db;

	 	var defaultPhoto = {
		    'name' : '',
		    'url' : '',
		    'width' : '',
		    'height' : ''
	  	}

		// Format the Data for insertion
		var newPhoto = {
			"name" : req.body.name,
			"urls" : {
				"full" : req.body.urlFull,
				"1600" : req.body.url1600,
				"1200" : req.body.url1200,
				"800"  : req.body.url800,
				"400"  : req.body.url400,
			},
			"width" : req.body.width,
			"height" : req.body.height
		};

		// Grab our table
		var collection = db.get(db_table);

		return collection.insert(newPhoto);
	},
	deletePhoto: function(req, id) {

	}
}

module.exports = photoController;