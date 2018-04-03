const mongoose = require('mongoose');

const User = mongoose.model('User',{name: String});

exports.CreateUser = function(){
	console.log("creating user");
}