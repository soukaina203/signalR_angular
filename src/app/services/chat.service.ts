import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as signalR from "@microsoft/signalr"
import { Message } from '../Models/Message';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
public messages$=new BehaviorSubject<any>([]);
public messages :Message[]=[]


 public connection:signalR.HubConnection=new signalR.HubConnectionBuilder()
 .withUrl("http://localhost:5000/chat").withAutomaticReconnect()
 .build()
 constructor() {
  this.start();

  this.connection.on("RecieveMessage",(message:Message)=>{

    this.messages=[...this.messages,message]

    this.messages$.next(this.messages)

  })
 }
//   start the connection
public  start(){
  console.log("the connection has started")
   this.connection.start().then((e)=>{
  }).catch((e)=>{
  });
}
//  send messages
public async SendMessage(message:Message) {

  console.log("entred")
  return  await this.connection.invoke("SendMessage",message).then((e)=>{console.log(e)}).catch((e)=>{
    console.log("failed")
  })
}
}
