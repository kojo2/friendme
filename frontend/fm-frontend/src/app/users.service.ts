import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {

	results;
	friends;
	textd;
	response;

  constructor(private http:Http) { }

  findUsers(){

  	return this.http.get('http://localhost:8080/users').map(response=>response.json());
  	
 	
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
	let response = this.http.get('http://localhost:8080/friends');
	/*console.log(response.map(response => response.text()));*/
	
  }

  findUser(username,password){
  	let response = this.http.post('http://localhost:8080/login',{username:username,password:password});
  	return response.map(response =>response.text());
  }

  createUser(username,password){
  	//return "creating user "+username+" with password: "+password;
  	return this.http.post('http://localhost:8080/register',{username:username,password:password}).map(response => response.text());
  }
  //did stands for destination user id (who is the request going to?)
  createFriendRequest(id,name){
  	return this.http.post('http://localhost:8080/friendRequest',{userId:id,username:name}).map(response=>response.text());
  }
  getFriendRequests(){
  	return this.http.get('http://localhost:8080/friendRequests').map(response=>response.text());
  }



}
