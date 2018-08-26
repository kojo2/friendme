import { Injectable } from '@angular/core';

import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  constructor(private http:HttpService) { }

  createConversation(userid) {
  	return this.http.post('conversation',{userid:userid},true,true);
  }

  addMessage(userid,message){
  	return this.http.post('conversation/message',{userid:userid,message:message},true);
  }
}
