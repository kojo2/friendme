import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results;

  f="f";

  constructor(private usersService:UsersService) {
   }

  ngOnInit() {
  	this.usersService.findUsers().subscribe(results=>this.results = results);
  }
  
}
