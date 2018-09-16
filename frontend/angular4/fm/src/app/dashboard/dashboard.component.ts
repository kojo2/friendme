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
  avatar = "";

  constructor(private usersService:UsersService, private router:Router) { }

  ngOnInit() {
    //get username out of local storage
    this.name = this.capitalize(localStorage.getItem('username'));
    
    this.getFriends();
  	this.getMyAvatar();
  	this.usersService.getFriendRequests().subscribe(results=>{
      if(results)
        this.friendRequests=results;
    });
    let thisObj = this;
    // poll the server for changes every 3 seconds, this will mean the friend list showing who's online 
    // and what the last message received from that friend will be completely live
    window.setInterval(function(){
     thisObj.getFriends();
    },3000);
  }

  // quick capitalize function
  capitalize(str) {
    return str[0].toUpperCase()+str.slice(1,str.length);
  }

  logout(){
    this.usersService.logout().subscribe(response=>{
      console.log(response);
      // when we log out we tell the server and then reset all the localStorage variables
      localStorage.setItem('loggedIn','false');
      localStorage.setItem('username',null);
      localStorage.setItem('password',null);
      this.router.navigate(['']);
    });
  }

  getFriends(){
    // use the user service to find all the friends of the logged in user
    this.usersService.findFriends().subscribe((friends) => {
      let friendsArr = [];
        friends.forEach((friend)=>{
        friend.lmEmpty = false;
        var length = friend.lastMessage.length;
        // if friend's last message was too long then cut it down so it fits in the window
        if(length>50){
          friend.lastMessage = friend.lastMessage.substr(0,50)+"...";
        }
        // get the timestamp of the last sent message
        var dt = friend.timeStamp;
        try {
          // change from 24h time to 12h time. eg 16:00 to 4:00pm
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
        }
        catch(err){
          friend.timeStamp = "";
        }
        if(friend.lastMessage==""){
          friend.lastMessage = "You haven't spoken to this person yet";
          friend.lmEmpty = true;
        }
        friendsArr.push(friend);
        console.log(friendsArr);
      });
      this.friends = friendsArr;
    });
  }

  getMyAvatar(){
    //get avatar of logged in user
    this.usersService.getMyAvatar().subscribe((avatar)=>this.avatar = avatar);
  }
}
