const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./Models/users');
const webSocket = require('websocket');
const { validateLoc } = require('./validateLoc');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session:expressSession});
//const cors = require('cors');

const app = express();

//app.use(cors());

var WebSocketServer = webSocket.server;


//mongoose.connect('mongodb://localhost/fm');

//require('./Models/Users');


app.use(express.json());

// set up body parser middlware

//app.use(bodyyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({store: new mongoStore({ mongooseConnection: mongoose.connection}),secret:'dsjfaq3iojhgjhg5hj36jhgjh56khg53645jrmfsa',cookie : {maxAge:60*60*1000}}));


// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials","true");
  next();
});

	app.post('/login/',function(req,res){
		var username = req.body.username;
		var password = req.body.password;

		//console.log(username+" and "+password);

		users.FindUserCheckPassword(username,password).then(function(user){
			if(user!=false){
				req.session.regenerate(function(){
					req.session.user = user.id;
					req.session.username = user.username;
					req.session.msg = 'Authenticated as '+user.username;
					//console.log("user logged in is: "+req.session.user);
					res.send("true");
				});
			}
			else{
				//console.log("couldn't find user");
				res.send("false");
			}
			//console.log(user);
			//res.send(result);
		})
	});


	app.get('/friends',function(req,res){
		//console.log(req.body.userid+" requested their friends list");	
		//console.log(req.session);
			users.FindFriendsForUser(req.session.user).then(function(friendList){
				if(friendList)
					res.send(friendList);
				else
					res.json({});
			});
		
	});

	app.post('/register/',function(req,res){
		var username = req.body.username;
		var password = req.body.password;
		var loc = req.body.loc;
		console.log(req.body);
		// if the location loc is a postcode then geocode it to a location using google 
		validateLoc(loc).then(function(loc){
			// DEV line for delete all documents in users collection - Just faster than compass!
			if(username==""){
				users.DeleteAll();
				console.log("deleted everything");
			}else{
			users.FindUser(username,password).then(
				function(result){
					if(!result){
						// if user doesn't already exist then create them
						users.CreateUser(username,password,loc);
						res.send("User created successfully");
						console.log("sending User created successfully")
					}
					else{
						res.send("User already exists");
						console.log("sending User already exists");
					}
				},
				function(err){
					res.send("there was an unspecified error");
					console.log("sending there was an unspecified error");
				});
			}
		})
		
		
		
		
	});

	app.get('/friends/add',function(req,res){
		users.AddFriendForUser(req.session.id,req.body.fid).then(result => {
			return users.DeleteFriendRequest(req.session.user,req.body.fid);
		})
	});

	app.get('/session',function(req,res){
		//console.log(req.session.id);
		res.send(req.session.id);
	})

	app.get('/users',function(req,res){
		users.FindAllOtherUsers(req.session.user).then(function(data){
			//console.log(data);
			res.json(data);
		});
	});

	app.post('/search',function(req,res){
		dist = req.body.distance;
		loc = req.body.position;
		validateLoc(loc).then(function(loc){
			users.searchUsersByDistance(req.session.user,dist,loc).then(function(data){
				res.json(data);
			});
		});
		

	});

	app.get('/user/:userid',function(req,res){
		//console.log("trying to get profile for user id: "+req.params.userid);
		users.ShowPublicInformationForUser(req.params.userid).then(result=>res.send(result));
	});
	
	app.post('/friendRequest',function(req,res){
		users.CreateFriendRequest(req.body.userId,req.session.user,req.session.username).then(response=>res.send(response));
		
	});

	app.post('/friendRequest/accept',function(req,res){
		users.DeleteFriendRequest(req.session.user,req.body.userId);
		users.AddFriendForUser(req.body.userId,req.session.user);
		users.AddFriendForUser(req.session.user,req.body.userId);
		res.send("accepted friend!");
	});

	app.get('/friendRequests',function(req,res){
		//console.log(req.session);
		if(req.session.user)
			users.GetFriendRequests(req.session.user).then(response=>res.json(response.friendRequests))
	});

	app.get('/logout',function(req,res){
		console.log("now destroying session");
		req.session.destroy();
		res.send("sucess");
	});

	//app.get('/')

function get(url,resp){
	app.get('/'+url,(req,res)=>{
		res.send(resp);
	});
}

app.get('/',function(req,res){
	let struc = {
		man:"bob",
		dog:"Yappie"
	};
	res.json(struc);
})
get('login','retrieving user');
//get('register','registering new user');


app.listen(8080);

console.log("app listening on 8080");

var randomWords = require('random-words');

//console.log(randomWords(10));
