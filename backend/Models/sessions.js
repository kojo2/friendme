const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({_id: 'string', session:'string', expires:'date'});
const Session = mongoose.model('Session',sessionSchema);

mongoose.connect('mongodb://localhost/fm');


exports.checkSession = function(sessionid){
	return Session.findOne({session:{"$regex":'"user":"'+sessionid+'"'}}).then((session)=>{
		if(session){
			return true;
			console.log("true");
		}
		else
		{
			return false;
			console.log("false");
		}
	});
}

exports.deleteAll = function(){
	Session.remove({},function(){});
}
