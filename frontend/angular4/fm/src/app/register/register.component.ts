import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';




@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	userExists = false;

	locationObj;

	message;

	constructor(private service:UsersService){

	}

	ngOnInit(){
		this.getLocation();
	}

	change(f){
		
	}	

	getLocation() {
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition((position)=>{
	        	console.log(position);
	        	this.locationObj = { lat: position.coords.latitude, lon: position.coords.longitude };
	       });
	    } else {
	        alert("Geolocation is not supported by this browser.");
	    }

  	}

	submit(f){
		let loc;
		if(f.value.location==""){
			loc = this.locationObj;
		}else{
			loc = f.value.location;
		}
		if(!loc){
			alert("please provide your postcode or allow the location prompt");
			this.getLocation();
		}
		else {
			console.log("this is what im sending to the server");
			console.log(loc);
			this.service.createUser(f.value.username,f.value.password,loc).subscribe(response=>{
				console.log(response);
				alert(response);
			});
		}
	}

}