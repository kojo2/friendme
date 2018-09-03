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
  	return this.http.get('users',true);
  }

  findFriends(){
	return this.http.get('friendsConvos',true);
  }

  findUser(username,password){
  	return this.http.post('login',{username:username,password:password},true,true);
  }

  getUserProfile(userId){
    return this.http.get('user/'+userId,true);
  }

  searchAllUsers(distance,position){
    return this.http.post('search',{distance:distance, position:position},true);
  }

  createUser(username,password,aboutMe, ldislikes,loc){
  	//return "creating user "+username+" with password: "+password;
  	return this.http.post('register',{username:username,password:password,aboutMe:aboutMe,ldislikes:ldislikes,loc:loc},false,true);
  }
  //did stands for destination user id (who is the request going to?)
  createFriendRequest(id,name){
  	return this.http.post('friendRequest',{userId:id,username:name});
  }
  getFriendRequests(){
  	return this.http.get('friendRequests');
  }
  acceptFriendRequest(id){
  	return this.http.post('friendRequest/accept',{userId:id},true,true);
  }
  logout(){
    return this.http.get('logout',true,true);
  }


}
