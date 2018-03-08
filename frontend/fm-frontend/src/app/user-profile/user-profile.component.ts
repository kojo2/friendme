import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name = "";
  friend = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.paramMap.subscribe(params=> {
  		this.name = params.get('username');
  		this.friend = (params.get('friend')=="true");
  	})
  }

}
