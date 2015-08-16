var express = require('express');
var passport = require('passport');

var AdminController = {
	Index : function(req,res) {
		if(req.isAuthenticated()) { res.send("User is logged in"); }
		else {
			res.redirect('/admin/login');
		}
	}
};

module.exports = AdminController;