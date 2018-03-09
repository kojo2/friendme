import { Injectable } from '@angular/core';


@Injectable()
export class UsersService {

	results;
	friends;

  constructor() { }

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
}
