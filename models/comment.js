var mongoose = require('mongoose');

//Schma setup
var commentSchema = mongoose.Schema({
	text: String,
	author: String
});

module.exports = mongoose.model('Comment', commentSchema);