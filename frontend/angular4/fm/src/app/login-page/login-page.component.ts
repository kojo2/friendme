import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

import { Router } from '@angular/router';

import { ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	message;

	user;

  constructor(private service:UsersService, private router:Router) { 
    document.body.className = "bg-picture";
  }

  ngOnDestroy(){
    document.body.className="";
  }

  ngOnInit() {
    /*if(localStorage.getItem('loggedIn')){
      console.log("exists");
      this.service.getSession().subscribe(response=>{
        if(response.length){
          console.log(response);
          this.router.navigate(['dashboard']);
         }
      });
    }else{
      console.log("doesn't exist");
    }*/
  }

  submit(f){  
  	this.service.findUser(f.value.username,f.value.password).subscribe((response)=>{
     console.log(response);

      if(response=="true"){
        localStorage.setItem('loggedIn','false');
        this.router.navigate(['dashboard']);
      }
      else{
        alert("couldn't find user!");
        localStorage.setItem('loggedIn','false');
       }
  	});
  }

}
