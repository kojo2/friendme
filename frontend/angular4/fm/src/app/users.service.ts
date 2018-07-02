import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {

	results;
	friends;
	textd;
	response;

  constructor(private http:HttpClient) { }

  findUsers(){

  	return this.http.get('http://localhost:8080/users');
  	
 	
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
  	return this.http.post('http://localhost:8080/login',{username:username,password:password},{ withCredentials:true,responseType: 'text' });
  }

  createUser(username,password){
  	//return "creating user "+username+" with password: "+password;
  	return this.http.post('http://localhost:8080/register',{username:username,password:password},{withCredentials:true});
  }
  //did stands for destination user id (who is the request going to?)
  createFriendRequest(id,name){
  	return this.http.post('http://localhost:8080/friendRequest',{userId:id,username:name},{withCredentials:true});
  }
  getFriendRequests(){
  	return this.http.get('http://localhost:8080/friendRequests',{withCredentials:true});
  }



}
