import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

results = [
	{
		name:'Matt',
		distance: '15m'
	},
	{
		name:'Fiona',
		distance: '10m'
	},
	{
		name:'Timothy',
		distance: '25m'
	}
];



  constructor() { }

  ngOnInit() {
  	console.log("hello");
  }

}
