import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  sessionId = "";
  loggedin = false;
  constructor(){}

  back(){
  	window.history.back();
  }

  ngOnInit(){
    this.loggedin = localStorage.getItem('loggedIn')=='true';
  }
}

