const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
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

app.post('/login/',function(req,res){
	res.send("req.body.username = "+req.body.username);

	// now we have the username being searched for we can go and try and find that user in the mongodb database
	
});

app.post('/register/',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	res.send("now creating user on the server with username: "+username+" and password: "+password);
});
get('friends',friends);
get('results',results);

app.listen(8080);

console.log("app listening on 8080");

var randomWords = require('random-words');

console.log(randomWords(10));
