const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./Models/users');
const app = express();

//mongoose.connect('mongodb://localhost/fm');

//require('./Models/Users');


app.use(express.json());

// set up body parser middlware

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Allow CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
	app.post('/login/',function(req,res){
		var username = req.body.username;
		var password = req.body.password;

		console.log(username+" and "+password);

		users.FindUserCheckPassword(username,password).then(
			function(result){
				if(result==null)
					res.send({type:0,data:null});
				else
					res.send({type:1,data:result});
			},
			function(err){
				res.send(err);
			}
		);	
	});

	app.post('/register/',function(req,res){
		var username = req.body.username;
		var password = req.body.password;

		console.log(username+" and "+password);
		
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

function get(url,resp){
	app.get('/'+url,(req,res)=>{
		res.send(resp);
	});
}

let results = [
	{
		name:'Matt',
		distance: '15m'
	},
	{
		name:'Fiona',
		distance: '10m'
	},
	{
		name:'Timothy',
		distance: '25m'
	}
];

let friends = [
	{
		name:'Danny',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	},
	{
		name:'Rebecca',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	},
	{
		name:'Tina',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	},
	{
		name:'Max',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	}
];

get('','landing page');
get('login','retrieving user');
//get('register','registering new user');


get('friends',friends);
get('results',results);

app.listen(8080);

console.log("app listening on 8080");

var randomWords = require('random-words');

//console.log(randomWords(10));
