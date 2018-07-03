import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name = "";
  friend = false;
  id;
  friendRequested = false;
  constructor(private route: ActivatedRoute, private service:UsersService) {
  }

  ngOnInit() {
  	this.route.paramMap.subscribe(params=> {
      this.id = params.get('_id');
      console.log("id "+this.id);
  		this.name = params.get('username');
  		this.friend = (params.get('friend')=="t");
      this.friendRequested = (params.get('friend')=='r');
  	})
  }

  friendRequest(){
     this.service.createFriendRequest(this.id,this.name).subscribe(response=>alert(response));
  }

  acceptFriendRequest(){
    this.service.acceptFriendRequest(this.id).subscribe(response=>console.log(response));
  }
}
