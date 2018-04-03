import { Component, OnInit } from '@angular/core';

import { UsersService } from '../users.service';

@Component({
  selector: 'login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private service:UsersService) { }

  ngOnInit() {
  }

  submit(f){
  	alert(this.service.findUser(f.value.username));
  }

}
