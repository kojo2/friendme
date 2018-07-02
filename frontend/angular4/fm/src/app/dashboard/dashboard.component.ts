import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	userId = 1;
	friends;
	friendRequests;

  constructor(private usersService:UsersService) { }

  ngOnInit() {
  	this.usersService.findFriends().subscribe(friends => this.friends = friends);
  	this.usersService.getFriendRequests().subscribe(results=>{
      if(results)
        this.friendRequests=results;
    });
  }

}
