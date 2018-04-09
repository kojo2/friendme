import { Injectable } from '@angular/core';

import { Http } from '@angular/http';


@Injectable()
export class UsersService {

	results;
	friends;

	response;

  constructor(private http:Http) { }

  findUsers(){

  	this.results = [
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


  	return this.results;
  }

  findFriends(userId){
  	this.friends = [
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
	return this.friends;
  }

  findUser(username){
  	this.http.post('http://localhost:8080/login',username).subscribe((response)=>{
  		console.log(response);
  	});
  }

  createUser(username,password){
  	//return "creating user "+username+" with password: "+password;
  	var params = [username,password];
  	this.http.post('http://localhost:8080/register',params).subscribe((response)=>
  		return "got to the server";
  	});
  }
}
