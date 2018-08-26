import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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
  messages = [];
  ws;
  myUsername;

  constructor(private route:ActivatedRoute, private conversationService:ConversationService, private changeDetectorRef:ChangeDetectorRef) { }

  ngOnInit() {
    this.myUsername = localStorage.getItem('username');
    let thisObj = this;
  	this.route.paramMap.subscribe(params=> {
  		this.name = params.get('username');
      this.id = params.get('id');
      // initiate conversation
      this.conversationService.createConversation(this.id).subscribe((response)=>{
        let obj = JSON.parse(response);
        /*obj.forEach((ob)=>{
          thisObj.messages.push(ob.message);
          console.log(ob);
        });*/
        //console.log(obj);
      });
      this.ws = new WebSocket('ws://localhost:1234','echo-protocol');
      let ws = this.ws;
      this.ws.addEventListener('message',function(e){
        if(e.data=="connected"){
          // initial connection pingback to server 
          ws.send(JSON.stringify({message:'initial',otherUser:thisObj.id,otherUsername:thisObj.name}));
        }
        var msg = e.data;
        // if msg contains "typ" then it is of initial type and is used to bring in the previous conversation history
        let msgType;
        if(msg.indexOf("typ")>-1){
          msgType = "initial";
        }else{
          msgType = "message";
        }
        if(msgType=="message"){
          thisObj.messages.push(msg);
        }else if(msgType=="initial"){
          let msgObj;
          try{
            msgObj = JSON.parse(msg);
           } catch(e) {
             msgObj = {}
           }
          console.log("msg: ");
          console.log(msg);
          if(msgObj.typ=="initial"){
            let identifiers = msgObj.identifiers;
            console.log("identifiers");
            console.log(identifiers);
            if(!msgObj.conversation){
              return;
            }
             msgObj.conversation.messages.forEach((message)=>{
               let strUserid = "userid"+message.userId;
               let username = identifiers[strUserid];
               thisObj.messages.push(username+" says: "+message.message);
             });
          }
        }
        console.log("message type: "+msgType);
      }); 
  	});
  }

  send() {
    var packet = {message:this.message,otherUser:this.id,otherName:this.name};
    this.ws.send(JSON.stringify(packet));
    this.messages.push(this.myUsername+" says: "+this.message);
    this.conversationService.addMessage(this.id,this.message).subscribe((response)=>console.log(response));
  }

}

