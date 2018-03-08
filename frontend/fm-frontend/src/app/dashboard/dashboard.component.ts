import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

friends = [
	{
		name:'Danny',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	},
	{
		name:'Rebecca',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	},
	{
		name:'Tina',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	},
	{
		name:'Max',
		picture: 'http://imgpic.com/4lkjr4kjh0.jpg'
	}
];

  constructor() { }

  ngOnInit() {
  }

}
