var express = require('express');
var schemas = require('../schemas.js');
var db_table = 'mediafile'; 

var Photo = function(data) {
	this.data = data;
}

Photo.getAll = function(req) {
	var db = req.db;
	var photos = db.get('mediafile');

	return photos.find({},{});
}

Photo.findByID = function(req) {
	var db = req.db;
	var photos = db.get('mediafile');
	var id = req.params.id;

	return photos.find({'_id': ''})
}

Photo.findByPortfolio = function(req, portfolio) {
	var db = req.db;
	var photos = db.get(db_table);
	query = { '_id' : { $in : portfolio.photos }}
	console.log(portfolio.photos);
	return photos.find({_id: {$in: portfolio.photos }})
}

Photo.deleteByID = function(req,id) {
	var db = req.db;
	var photos = db.get(db_table);

	return photos.remove({ '_id' : photoID });
}

Photo.prototype = {
	data: {},
	save: function(params) {

	},
	remove: function(id) {

	}
}

module.exports = Photo;