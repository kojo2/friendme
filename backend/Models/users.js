const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const schema = new mongoose.Schema({username: 'string', password:'string', friendList:[{userId:Number,username:String}]});

const User = mongoose.model('User',schema);


mongoose.connect('mongodb://localhost/fm');

autoIncrement.initialize(mongoose.connection);
schema.plugin(autoIncrement.plugin,'User');

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
	/*return User.findOne({username:_username,password:_password}).then(result=>result).catch("there was an error");*/
	return User.findOne({username:_username,password:_password}).then((result)=>{if(result.password==_password) {return result} else {return false}}).catch((err)=>{return false});
}

exports.DeleteAll = function(){
	User.remove({},function(){});
}

exports.FindFriendsForUser = function(_userid){
	return User.findOne({_id:_userid}).then(function(user){
		return user.friendList;
	});
}