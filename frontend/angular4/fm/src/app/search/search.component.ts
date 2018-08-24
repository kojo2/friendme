import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  distance;
  postCode;
  loc;
  constructor(private service:UsersService, private router:Router) { }

  thisObject = this;

  getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        	this.loc = position;
       });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
  }
 

  ngOnInit() {
	  this.getLocation();
  }

  go() {
    if(!this.loc){
      if(this.postCode.length>0) {
        this.loc = this.postCode;
        this.send();
      }
      else
        alert("you must provide a postcode or allow the location prompt");
    }else{
      this.send();
    }
  }

  send() {
    this.router.navigate(['/results',this.loc,this.distance]);
  }

}
