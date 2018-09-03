import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.component.html',
  styleUrls: ['./pong.component.css']
})
export class PongComponent implements OnInit {

  ws;
  constructor() { }

  ngOnInit() {
    this.ConnectToServer();
  }
  ConnectToServer(){
    this.ws = new WebSocket('ws://localhost:1234','echo-protocol');

    
  }

}
