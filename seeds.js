var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: 'Cloud\'s Rest',
		image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
		description: 'blah blah blah'
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg',
		description: 'blah blah blah'
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm3.staticflickr.com/2409/2251892884_a5b0048ed1.jpg',
		description: 'blah blah blah'
	}
];

function seedDB()
{
	//Remove all campgrounds
	Campground.deleteMany({}, function(err){
		if(err)
		{
			console.log(err);
		}

		console.log('Removed campgrounds.');
		//Add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed, function(err, campground){
				if(err)
				{
					console.log(err);
				}
				else
				{
					console.log('Added a campground.');
					//Create a comment
					Comment.create(
						{
							text: 'This place is great, but I wish there was internet.',
							author: 'Homer'
						}, function(err, comment){
							if(err)
							{
								console.log(err);
							}
							else
							{
								campground.comments.push(comment);
								campground.save();
								console.log('Created new comment.');
							}
					});
				}
			});
		});
	});
}

module.exports = seedDB;