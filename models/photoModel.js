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
var Photo = (function () {
    function Photo(data) {
        var _this = this;
        this.getAll = function () {
            return _this.photoDB.find({}, {});
        };
        this.findByID = function (id) {
            return _this.photoDB.find({ '_id': id });
        };
        // Finds all photos given a list of IDs
        this.findInList = function (idList) {
            var query = {
                _id: {
                    $in: idList
                }
            };
            return _this.photoDB.find(query);
        };
        this.deleteByID = function (id) {
            return _this.photoDB.remove({ '_id': id });
        };
        this.data = data;
        this.tableName = 'mediafile';
        this.photoDB = db.get(this.tableName);
    }
    return Photo;
})();
module.exports = Photo;
