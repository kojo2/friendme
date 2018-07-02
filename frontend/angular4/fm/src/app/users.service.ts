import { Injectable } from '@angular/core';

import { HttpService } from './http.service';


import 'rxjs/add/operator/map';


@Injectable()
export class UsersService {

	results;
	friends;
	textd;
	response;

  constructor(private http:HttpService) { }

  // check if session is still active
  getSession(){
    return this.http.get('session',true,true);
  }

  findUsers(){
  	return this.http.get('users',false);
  }

  findFriends(){
	return this.http.get('friends');
  }

  findUser(username,password){
  	return this.http.post('login',{username:username,password:password},true,true);
  }

  createUser(username,password){
  	//return "creating user "+username+" with password: "+password;
  	return this.http.post('register',{username:username,password:password});
  }
  //did stands for destination user id (who is the request going to?)
  createFriendRequest(id,name){
  	return this.http.post('friendRequest',{userId:id,username:name});
  }
  getFriendRequests(){
  	return this.http.get('friendRequests');
  }
  acceptFriendRequest(id,name){
  	return this.http.post('friendRequest/accept',{userId:id,username:name},true,true);
  }



}
