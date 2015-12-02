/// <reference path="../node.d.ts" />
var express = require('express');
var schemas = require('../schemas.js');
var db = require('../db.js');

/* Model for Photos in the DB
SCHEMA:
id: null,
name: string - Title of the URL
urls: {}, - Object list of various size URLs
height: number, - Height of the fullsize image
width: number, - Width of the fullsize image
caption: string, - Caption describing image

*/



class Photo implements IPhoto {
	data: any;
	tableName: string;
	photoDB: any;
	
	constructor(data) {
		this.data = data;
		this.tableName = 'mediafile';
		this.photoDB = db.get(this.tableName);
	}
	
	getAll = () => {
		return this.photoDB.find({},{});
	}
	
	findByID = (id) => {
		return this.photoDB.find({'_id': id});
	}
	
	// Finds all photos given a list of IDs
	findInList = (idList) => {
		var query = {
  			_id: {
  					$in: idList 
  				}
  			};
			  
		return this.photoDB.find(query);
	}
	
	deleteByID = (id) => {
		return this.photoDB.remove({ '_id' : id });
	}
}

module.exports = Photo;