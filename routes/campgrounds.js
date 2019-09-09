// ===================
// CAMPGROUNDS ROUTES
// ===================

var express = require('express');
var router = express.Router();
var Campground 	= require('../models/campground');

//INDEX - show all campgrounds
router.get('/', function(req, res) {
	//Get all campground from DB
	Campground.find({}, function (err, allCampgrounds) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render('campgrounds/index', {campgrounds: allCampgrounds});
		}
	});
});

//CREATE - add new campgrounds to DB
router.post('/', isLoggedIn, function(req, res) {
	//get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, image: image, description: description, author: author};
	
	//Create a new campground and save to DB
	Campground.create (newCampground, function(err, newlyCreated) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			//redirect page to the campgrounds page
			res.redirect('/campgrounds');
		}
	});
});

//NEW - show form to create new campground
router.get('/new', isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
router.get('/:id', function(req, res) {
	//Find the campground with provide ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log(foundCampground);
			//Render show template with that campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}

module.exports = router;