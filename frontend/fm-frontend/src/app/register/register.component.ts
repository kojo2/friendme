import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';


@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	userExists = false;

	constructor(private service:UsersService){

	}

	ngOnInit(){

	}

	change(f){
		// check if user already exists - if it does then show it on form before the form is submitted
		if(f.value.username == "Jack")
			this.userExists = true;
		else
			this.userExists = false;
	}

	submit(f){
		if(!this.userExists)
			alert(this.service.createUser(f.value.username,f.value.password));
		else
			alert("there was a problem!");
	}

}