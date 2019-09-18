// ===================
// CAMPGROUNDS ROUTES
// ===================

var express = require('express');
var router = express.Router();
var Campground 	= require('../models/campground');
var middleware = require('../middleware');

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
router.post('/', middleware.isLoggedIn, function(req, res) {
	//get data from form and add to campground array
	var name = req.body.name;
	var price = req.body.price;
	var image = req.body.image;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name: name, price: price, image: image, description: description, author: author};
	
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
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

//SHOW - shows more info about one campground
router.get('/:id', function(req, res) {
	//Find the campground with provide ID
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground) {
		if(err || !foundCampground)
		{
			req.flash('error', 'Campground not found.');
			res.redirect('back');
		}
		else
		{
			console.log(foundCampground);
			//Render show template with that campground
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

//EDIT CAMPGROUND ROUTE
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		res.render('campgrounds/edit', {campground: foundCampground});
	});
});

//UPDATE CAMPGROUND ROUTE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	//Find and update the correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			//Redirect somewhere(show page)
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//DESTROY CAMGROUND ROUTE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds');
		}	 
	});
});

/*
//Middleware
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/login');
}*/

/*function checkCampgroundOwnership(req, res, next) {
	//Is user logged in?
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err) {
				res.redirect('back');
			} else {
				//Does user own the campground?
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');	
				}
			}
		});
	} else {
		res.redirect('back');
	}
}*/

module.exports = router;