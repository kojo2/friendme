import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


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

  findUser(username,password){
  	let response = this.http.post('http://localhost:8080/login',{username:username,password:password});
  	return response.map(response =>response.json());
  }

  createUser(username,password){
  	//return "creating user "+username+" with password: "+password;
  	return this.http.post('http://localhost:8080/register',{username:username,password:password}).map(response => response.text());

  }
}
