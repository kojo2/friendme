import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	message;

	user;

  constructor(private service:UsersService) { }

  ngOnInit() {
  }

  submit(f){
  	this.service.findUser(f.value.username,f.value.password).subscribe((response)=>{
      console.log(response);
  		if(response.type==0){
  			this.message = "User not found";
  			this.user = {username:"",password:""};
  		}else if (response.type==1){
  			this.user = response.data;
  			this.message = "";
  			console.log(this.user);
  		}
  	});
  }

}
