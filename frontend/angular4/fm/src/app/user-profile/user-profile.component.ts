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
  profile;
  constructor(private route: ActivatedRoute, private service:UsersService) {
  }

  ngOnInit() {
  	this.route.paramMap.subscribe(params=> {
      this.id = params.get('_id');
      console.log("id "+this.id);
      this.name = params.get('username');
      this.name = this.name[0].toUpperCase()+this.name.slice(1,this.name.length);
  		this.friend = (params.get('friend')=="t");
      this.friendRequested = (params.get('friend')=='r');
      this.service.getUserProfile(params.get('_id')).subscribe((response)=>{
        this.profile = response;
      });
  	})
  }

  friendRequest(){
     this.service.createFriendRequest(this.id,this.name).subscribe(response=>alert(response));
  }

  acceptFriendRequest(){
    this.service.acceptFriendRequest(this.id).subscribe(response=>console.log(response));
  }
}
