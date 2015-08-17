var express = require('express');
var passport = require('passport');
var adminController = require('../controllers/adminController');
var photoController = require('../controllers/admin/photoController');
var portfolioController = require('../controllers/portfolioController');
var admin  = express.Router();

function checkAuthentication(req, res, fn) {
	if(req.isAuthenticated()) { 
		fn(req,res);
	} else {
		res.redirect('/admin/login');
	}	
}

admin.get('/', function(req,res) {
	checkAuthentication(req,res, adminController.Index);
});

admin.get('/login', function(req,res) {
	res.render('admin/login', {
		"title" : "Title",
		user : req.user});
});

admin.post('/login',
	passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true}),
	function(req,res) {
		res.redirect('/admin');
});

/* ================= PHOTO SECTIONS ================ */

// Manage photos
admin.get('/photos', function(req,res,next) {
	checkAuthentication(req,res, photoController.Index);	
})

/* Add photo */
admin.get('/newphoto', function(req,res,next) {
	checkAuthentication(req,res, photoController.newPhoto);
});

admin.post('/addphoto', function(req, res, next) {
	checkAuthentication(req,res, function() {
		var insertPhoto = photoController.addPhoto(req,res);

		insertPhoto.on('success',function() {
			res.redirect('/admin/photos');
		})
	});
})

/* Delete photos */
admin.post('/deletephoto',function(req,res,next) {
	if(req.isAuthenticated()) { 
		var db = req.db;
		var collection = db.get('mediafile');
		var photoID = req.body.photoID;
		collection.remove({'_id' : photoID }, function(err) {
			if (err) {}
			else {
				res.redirect('/admin/photos');
			}
		})
	}
	else {
		res.redirect('/admin/login');
	}
})

/* Portfolio sections */
admin.get('/portfolios', function(req,res,next) {
	checkAuthentication(req,res, portfolioController.Index);
});

admin.get('/portfolios/:slug', function(req,res,next) {
	checkAuthentication(req,res, portfolioController.viewPortfolio);
})

admin.post('/portfolios/:slug/add', function(req,res,next) {
	checkAuthentication(req,res, portfolioController.AddPhoto);
}); 

module.exports = admin;