var express = require('express');
var db_table = 'portfolios';

var Portfolio = function(data) {
	this.data = data;
}

Portfolio.getAll = function(req) {
	var db = req.db;
	var portfolios = db.get(db_table);

	return portfolios.find({},{});
}

Portfolio.findByID = function(req) {
	var db = req.db;
	var portfolios = db.get(db_table);

	return portfolios.find({'_id': req.params.id})
}

Portfolio.findBySlug = function(req) {
	var db = req.db;
	var portfolios = db.get(db_table);

	return portfolios.findOne({'slug': req.params.slug})
}

Portfolio.addPhoto = function(req) {
	var db = req.db;
	var portfolios = db.get(db_table);
	var photos = db.get('mediafile');

	return portfolios.update({'slug': req.params.slug}, { $addToSet: { "photos" : photos.id(req.body.photoID) } })
}

Portfolio.addPortfolio = function(req) {
	var db = req.db;

	// Format the Data for insertion
	var newPortfolio = {
		"name" : req.body.name,
		"slug" : req.body.slug,
	};

	// Grab our table
	var portfolios = db.get(db_table);

	return portfolios.insert(newPortfolio);
}

Portfolio.prototype.save = function(req) {
	var db = req.db;
	var portfolios = db.get(db_table);
}

module.exports = Portfolio;