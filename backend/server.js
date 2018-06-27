const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./Models/users');
const webSocket = require('websocket');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var mongoStore = require('connect-mongo')({session:expressSession});

const app = express();

var WebSocketServer = webSocket.server;
var http = require('http');

//mongoose.connect('mongodb://localhost/fm');

//require('./Models/Users');


app.use(express.json());

// set up body parser middlware

//app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(expressSession({store: new mongoStore({ mongooseConnection: mongoose.connection}),secret:'dsjfaq3iojrmfsa',cookie : {maxAge:60*60*1000}}));


// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
		users.FindFriendsForUser(req.body.userid).then(function(friendList){
			res.send(friendList);
		});
	});

	app.post('/register/',function(req,res){
		var username = req.body.username;
		var password = req.body.password;

		//console.log(username+" and "+password);
		
		/*users.FindUser(username,password).then(function(result){
			console.log("found user");
		}, function(err){
			console.log("Did not find user");
		});*/

		// DEV line for delete all documents in users collection - Just faster than compass!
		if(username==null){
			users.DeleteAll();
			res.send("deleted everything");
		}else{
		users.FindUser(username,password).then(
			function(result){
				if(result==null){
					// if user doesn't already exist then create them
					users.CreateUser(username,password);
					res.send("User created successfully");
				}
				else{
					res.send("User already exists");
				}
			},
			function(err){
				res.send("there was an unspecified error");
			}
		);
		}
		
		
	});

	app.get('/friends/add',function(req,res){
		if(users.AddFriendForUser(req.session.id,req.body.fid))
			res.send("friend added");
	});

	app.get('/session',function(req,res){
		//console.log(req.session.id);
		res.send(req.session.id);
	})

	app.get('/users',function(req,res){
		users.FindAllOtherUsers().then(function(data){
			//console.log(data);
			res.json(data);
		});
	});

	app.get('/user/:userid',function(req,res){
		//console.log("trying to get profile for user id: "+req.params.userid);
		users.ShowPublicInformationForUser(req.params.userid).then(result=>res.send(result));
	});
	
	app.post('/friendRequest',function(req,res){
		users.CreateFriendRequest(req.body.userId,req.session.user,req.session.username).then(response=>res.send(response));
		
	});

	app.get('/friendRequests',function(req,res){
		console.log(req.session);
		//users.GetFriendRequests(req.session.user).then(response=>res.json(response.friendRequests))
	});

	//app.get('/')

function get(url,resp){
	app.get('/'+url,(req,res)=>{
		res.send(resp);
	});
}

get('','landing page');
get('login','retrieving user');
//get('register','registering new user');


app.listen(8080);

console.log("app listening on 8080");

var randomWords = require('random-words');

//console.log(randomWords(10));
