import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../conversation.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  name;
  id;
  message;

  constructor(private route:ActivatedRoute, private conversationService:ConversationService) { }

  ngOnInit() {
  	this.route.paramMap.subscribe(params=> {
  		this.name = params.get('username');
      this.id = params.get('id');
      // initiate conversation
      this.conversationService.createConversation(this.id).subscribe((response)=>console.log("response"));
  	});
  }

  send() {
    this.conversationService.addMessage(this.id,this.message).subscribe((response)=>console.log(response));
  }

}
