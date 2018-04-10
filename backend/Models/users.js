const mongoose = require('mongoose');

const schema = new mongoose.Schema({username: 'string', password:'string'});

const User = mongoose.model('User',schema);

mongoose.connect('mongodb://localhost/fm');

exports.CreateUser = function(_username,_password){
	var user = new User({"username":_username,"password":_password});
	user.save(function(err){
		if(err) 
			return err;
		//saved!
	});
}

exports.FindUser = function(_username,_password){
	return User.findOne({username:_username},function(err,user){
		if(err) return err;
		return user;
	}).then(function(result){
		return result;
	},function(err){
		return err;
	});
}

exports.FindUserCheckPassword = function(_username,_password){
	return User.findOne({username:_username},function(err,user){
		if(err) return err;
		return user;
	}).then(function(result){
		if(err) return err;
		if(_password===user.password)
			return result;
		else
			return null;
	},function(err){
		return err;
	});
}

exports.DeleteAll = function(){
	User.remove({},function(){});
}