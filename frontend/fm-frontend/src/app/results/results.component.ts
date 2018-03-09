import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  results;


  constructor(private usersService:UsersService) { }

  ngOnInit() {
  	this.results = this.usersService.findUsers();
  }
  
}
