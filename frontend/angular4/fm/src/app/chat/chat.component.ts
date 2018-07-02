import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  name;

  constructor(private route:ActivatedRoute) { }

  ngOnInit() {
  	this.route.paramMap.subscribe(params=> {
  		this.name = params.get('username');
  	})
  }

}
