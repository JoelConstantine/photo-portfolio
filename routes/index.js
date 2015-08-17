var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', function(req,res,next) {
	var db = req.db;
  var collection = db.get('mediafile');
  collection.find({},{},function(e, data) {
  	res.render('photos', {
  		'title' : "Photos",
  		'photos' : data
  	});
  });
})

router.get('/userlist', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(e, docs){
		res.render('userlist', {
			"title" : "User List",
			"userlist" : docs
		});
	});
});


router.post('/addphoto',function(req,res) {
	//Set our DB
	var db = req.db;

	// Get our Form Values
	var newPhoto = {
		"name" : req.body.name,
		"url" : req.body.url,
		"width" : req.body.width,
		"height" : req.body.height
	};

	var collection = db.get('mediafile');

	collection.insert(newPhoto,
		function(err, doc) {
			if (err) {
				res.send("There was a problem adding a new photo");
			} 
			else {
				res.redirect('/photos');
			}
		});
});

module.exports = router;
