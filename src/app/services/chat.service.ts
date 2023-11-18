import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Message } from '../Models/Message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messages$ = new BehaviorSubject<any>([]);
  // public messages: Message[] = [];
  // public message: Message;
  private connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5000/chat")
      .withAutomaticReconnect()
      .build();

    this.connection.start()
    this.connection.on("RecieveMessage", (message: Message) => {
      console.log('i came here')
       this.messages$.next(message)
    });

  }

  public SendMessage(message: Message) {
   this.connection.invoke('SendMessage',message).then((e)=>{
console.log(e)  }).catch((e)=>{
    console.log("failed",e)
   })
  }


}
