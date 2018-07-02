import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

import { Router } from '@angular/router';


@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

	message;

	user;

  constructor(private service:UsersService, private router:Router) { }

  ngOnInit() {
    this.service.getSession().subscribe(response=>{
        if(response.length){
          alert(response)
          this.router.navigate(['dashboard']);
         }
      });
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
