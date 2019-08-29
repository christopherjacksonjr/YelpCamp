var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
	{
		name: 'Cloud\'s Rest',
		image: 'https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg',
		description: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
	},
	{
		name: 'Desert Mesa',
		image: 'https://farm3.staticflickr.com/2116/2164766085_0229ac3f08.jpg',
		description: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).'
	},
	{
		name: 'Canyon Floor',
		image: 'https://farm3.staticflickr.com/2409/2251892884_a5b0048ed1.jpg',
		description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.'
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