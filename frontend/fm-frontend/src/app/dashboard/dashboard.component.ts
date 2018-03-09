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

  constructor(private usersService:UsersService) { }

  ngOnInit() {
  	this.friends = this.usersService.findFriends(this.userId);
  }

}
