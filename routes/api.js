var express = require('express');
var photoModel = require('../models/photoModel');
var portfolioModel = require('../models/portfolioModel');
var api = express.Router();

var db_table = 'mediafile';

/* GET Photos page. */
api.get('/photos', function(req, res, next) {
  var photos = photoModel.getAll(req);
  photos.on('success', function(data) {
  	res.json(data);
  });
});

api.get('/photo/:id', function(req,res,next) {
  var photos = photoModel.getFindByID(req);
  photos.on('success', function(e, data) {
    res.json(data);
  });
})

/* POST to insert a new photo */
api.post('/photo/add', function(req,res,next) {
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
		"url" : req.body.url,
		"width" : req.body.width,
		"height" : req.body.height
	};

	// Grab our table
	var collection = db.get(db_table);

	collection.insert(newPhoto,
		function(err, data) {
			if (err) {
				res.send("There was a problem adding a new photo");
			} 
			else {
				res.json(data);
			}
		});
})

api.get('/portfolios', function(req,res,next) {
  var portfolios = portfolioModel.getAll(req);
  portfolios.on("success", function(data) {
    res.json(data);
  })
})

api.get('/portfolios/:slug', function(req,res,next) {
  var portfolio = portfolioModel.findBySlug(req);
  portfolio.on("success", function(data) {
    var photos = photoModel.findByPortfolio(req, data);

    photos.on("success", function(doc) {
      var returnPortfolio = data;
      returnPortfolio.photos = doc;
      console.log(doc);
      res.json(returnPortfolio);
    });
  });
})

api.post('/portfolios', function(req,res,next) {
  var portfolios = portfolioModel.addPortfolio(req);
  portfolios.on("success", function(data) {
    res.json(data);
  })
})

module.exports = api;
