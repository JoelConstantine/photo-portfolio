var express = require('express');
var passport = require('passport');

function checkAuthentication(req, res, fn) {
	console.log("Checking authentication");
	if(req.isAuthenticated()) { 
		fn(req,res);
	} else {
		res.redirect('/admin/login');
	}	
}