var express = require('express');
var schemas = require('../schemas.js');
var db = require('../db.js');
var db_table = 'mediafile'; 

/* Model for Photos in the DB
SCHEMA:
id: null,
name: string - Title of the URL
urls: {}, - Object list of various size URLs
height: number, - Height of the fullsize image
width: number, - Width of the fullsize image
caption: string, - Caption describing image

*/


var Photo = function(data) {
	this.data = data;
	this.tableName = 'mediafile';
}

Photo.getAll = function() {
	var photos = db.get(this.table);

	return photos.find({},{});
}

Photo.findByID = function(id) {
	var photos = db.get('mediafile');

	return photos.find({'_id': id})
}

Photo.findByPortfolio = function(portfolio) {
	var photos = db.get(db_table);
	query = { '_id' : { $in : portfolio.photos }}

	return photos.find({_id: {$in: portfolio.photos }})
}

Photo.deleteByID = function(_,id) {
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