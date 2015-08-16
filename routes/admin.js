var express = require('express');
var passport = require('passport');
var router  = express.Router();

router.get('/', function(req,res) {
	if(req.isAuthenticated()) { res.send("User is logged in"); }
	else {
		res.redirect('/admin/login');
	}
});

router.get('/login', function(req,res) {
	res.render('admin/login', {
		"title" : "Title",
		user : req.user});
});

router.post('/login',
	passport.authenticate('local', { failureRedirect: '/admin/login', failureFlash: true}),
	function(req,res) {
		res.redirect('/admin');
});

/* ================= PHOTO SECTIONS ================ */

// Manage photos
router.get('/photos', function(req,res,next) {
	if(req.isAuthenticated()) { 
		var db = req.db;
		var collection = db.get('mediafile');
		collection.find({},{},function(e, data) {
		  	res.render('admin/managephotos', {
		  		'title' : "Photos",
		  		'photos' : data
		  	});
		});
	}
	else {
		res.redirect('/admin/login');
	}	
})

/* Add photo */
router.get('/newphoto', function(req,res,next) {
	if(req.isAuthenticated()) { res.render('admin/newphoto', {title:'Add New Photo'}); }
	else {
		res.redirect('/admin/login');
	}
})

router.post('/deletephoto',function(req,res,next) {
	if(req.isAuthenticated()) { res.redirect('/admin/photos'); }
	else {
		res.redirect('/admin/login');
	}
})
module.exports = router;