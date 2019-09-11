// ===================
// COMMENTS ROUTES
// ===================
var express 	= require('express');
var router 		= express.Router({mergeParams:true});
var Campground	= require('../models/campground');
var Comment	= require('../models/comment');

//Comments New
router.get('/new', isLoggedIn, function(req, res){
	//Find campground by ID
	Campground.findById(req.params.id, function(err, campground){
		if(err)
		{
			console.log(err);
		}
		else
		{
			res.render('comments/new', {campground: campground});
		}
	});
});

//Comments Create
router.post('/', isLoggedIn, function(req, res){
	//Lookup campground using ID
	Campground.findById(req.params.id, function(err, campground){
		if(err)
		{
			console.log(err);
			res.redirect('/campgrounds');
		}
		else
		{
			//Create new comment
			Comment.create(req.body.comment, function(err, comment){
				if(err)
				{
					console.log(err);
				}
				else
				{
					//Add username and id to comment
					comment.author.id = req.user._id;
					comment.author.username = req.user.username;
					
					//Save comment
					comment.save();
					
					//Connect new comment to campground
					campground.comments.push(comment);
					campground.save();
					
					//Redirect to campground show page
					res.redirect('/campgrounds/' + campground._id);
				}
			});
		}
	});
});

//COMMENT EDIT ROUTE
router.get('/:comment_id/edit', function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			res.redirect('back');
		} else {
			res.render('comments/edit', {campground_id: req.params.id, comment: foundComment});
		}
	});
});

//COMMENT UPDATE
router.put('/:comment_id', function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			res.redirect('back');
		} else {
			//Redirect somewhere(show page)
			res.redirect('/campgrounds/' + req.params.id);
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