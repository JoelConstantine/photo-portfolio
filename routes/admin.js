var express = require('express');
var passport = require('passport');
var adminController = require('../controllers/adminController');
var photoController = require('../controllers/admin/photoController');
var admin  = express.Router();

function checkAuthentication(req, res, fn) {
	console.log("Checking authentication");
	if(req.isAuthenticated()) { 
		fn(req,res);
	} else {
		res.redirect('/admin/login');
	}	
}

admin.get('/', adminController.Index);

admin.get('/', function(req,res) {
	if(req.isAuthenticated()) { res.send("User is logged in"); }
	else {
		res.redirect('/admin/login');
	}
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
module.exports = admin;