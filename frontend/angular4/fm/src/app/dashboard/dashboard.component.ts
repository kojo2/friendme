import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { getLocaleFirstDayOfWeek } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	userId = 1;
	friends;
	friendRequests;
  name;

  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit() {
    this.name = this.capitalize(localStorage.getItem('username'));
    
    this.getFriends();
  	
  	this.usersService.getFriendRequests().subscribe(results=>{
      if(results)
        this.friendRequests=results;
    });
    let thisObj = this;
    window.setInterval(function(){
     thisObj.getFriends();
    },3000);
  }

  capitalize(str) {
    return str[0].toUpperCase()+str.slice(1,str.length);
  }

  logout(){
    this.usersService.logout().subscribe(response=>{
      console.log(response);
      localStorage.setItem('loggedIn','false');
      localStorage.setItem('username',null);
      localStorage.setItem('password',null);
      this.router.navigate(['']);
    });
  }

  getFriends(){
    this.usersService.findFriends().subscribe((friends) => {
      let friendsArr = [];
        friends.forEach((friend)=>{
        var length = friend.lastMessage.length;
        if(length>50){
          friend.lastMessage = friend.lastMessage.substr(0,50)+"...";
        }
        var dt = friend.timeStamp;
        dt = dt.split("T")[1].split(":");
        var ap;
        if(dt[1]>12){
          dt[1]=parseInt(dt[1])-12;
          ap="pm";
        }else{
          dt[1]=dt[1][0];
          ap="am";
        }
        dt = dt[0]+":"+dt[1]+ap;
        friend.timeStamp = dt;
        friend.lastMessage = friend.lastMessage;  
        friendsArr.push(friend);
        console.log(friendsArr);
      });
      this.friends = friendsArr;
    });
  }
}
