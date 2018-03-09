const express = require('express');
const app = express();

app.use(express.json());

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
get('register','registering new user');
get('friends',friends);
get('results',results);

app.listen(8080);

console.log("app listening on 8080");

var randomWords = require('random-words');

console.log(randomWords(10));
