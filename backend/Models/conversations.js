const mongoose = require('mongoose');

const autoIncrement = require('mongoose-auto-increment');

const conversationSchema = new mongoose.Schema({userid: 'string', userid2:'string', messages:[{userId:Number,message:String}]});
const Conversation = mongoose.model('Conversation',conversationSchema);

mongoose.connect('mongodb://localhost/fm');

autoIncrement.initialize(mongoose.connection);
conversationSchema.plugin(autoIncrement.plugin,'Conversation');

exports.CreateConversation = function(userid,userid2){
	// first we check if a conversation already exists between these two users
	this.GetConversation(userid,userid2).then((exists)=>{
		console.log(exists);
		if(exists == null){
			var conversation = new Conversation({"userid":userid,"userid2":userid2});
			conversation.save(function(err){
			if(err) 
				return err;
				//console.log("there was an error: "+err);
			//saved!
			//console.log("saved user")
			});
		}	
	});
	
}

exports.GetConversation = function(userid,userid2){
	return Conversation.findOne({userid:userid,userid2:userid2}, function(err,conversation){
		if(!conversation){
			return Conversation.findOne({userid:userid2,userid2:userid}, function(err,conversation){
				if(!conversation)
					return false;
				else
					return conversation;
			});
		}else{
			return conversation;
		}
	});
}

exports.AddMessage = function(userid,userid2,message){
	return this.GetConversation(userid,userid2).then((conversation) => {
		return Conversation.update(
				{_id: conversation._id },
				{ $push: {messages: {message}}}		
		,(err,conversation)=>{
			return this.GetConversation(userid,userid2);
		});
	});

}

