var express = require('express');

var Photo = function(data) {
	this.data = data;
}

Photo.getAll = function(req) {
	var db = req.db;
	var photos = db.get('mediafile');

	return photos.find({},{});
}

Photo.findByID = function(id) {
	var db = req.db;
	var photos = db.get('mediafile');
	return photos.find({'_id': ''})
}

Photo.deleteByID = function(req,id) {
	
}

Photo.prototype = {
	data: {},
	getByID: function(id) {

	},
	addNew: function(params) {

	},
	deleteByID: function(id) {

	}
}

module.exports = Photo;