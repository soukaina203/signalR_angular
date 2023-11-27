import { Discussion } from './../../Models/Discussion';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/Models/Message';
import { ChatService } from 'src/app/services/chat.service';
import { DiscussionService } from 'src/app/services/discussion.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'chat-ui',
  templateUrl: './chat-ui.component.html',
})
export class ChatUiComponent {
  messageInput:string=''
  discService = inject(DiscussionService);
  messageService = inject(MessageService);
  messageModel: Message = new Message();
  openChat: boolean = false;
   userId = localStorage.getItem('userId');

  // store the sended msgs
  messages: any[] = [];

  chatService = inject(ChatService);
  fg!: FormGroup;
  // sending data to the message table in the database

  formBuilder = inject(FormBuilder);
  discussions!: Discussion[];
  DiscussionCurrent:Discussion;
  MessagesOfDiscussion: Message[];
  any = localStorage.getItem('userId');
  currentUserId: number;
  currentUserMsgs: Message[];
  otherUserMsgs: Message[];
  nameOfperson: string;
  DiscussionChoosed = (id: number) => {
    // message model
    this.messages=[]
    this.messageModel.idDiscussion = id;
    // retreive related messages of a specific discussion
    this.messageService.getMessagesOfDisscution(id).subscribe((res) => {
      // old messages of the discussion
      this.MessagesOfDiscussion = res.messages;
      this.DiscussionCurrent=res.discussion
      // message model
      console.log(this.DiscussionCurrent)



      if (this.currentUserId === res.discussion.idReceiver) {
        this.nameOfperson = res.discussion.sender_name;
      } else {
        this.nameOfperson = res.discussion.receiver_name;
      }
      this.openChat = true;
    });
  };

  sendMessage = () => {

    if ( this.currentUserId===this.DiscussionCurrent.idReceiver){
      this.messageModel.idSender=this.currentUserId;
      this.messageModel.idReceiver=this.DiscussionCurrent.idSender
    }else{
     this.messageModel.idSender=this.DiscussionCurrent.idSender;
     this.messageModel.idReceiver=this.DiscussionCurrent.idReceiver

    }


    this.messageModel.content = this.fg.value.message;
    console.log(this.messageModel)
    try {
      this.messageService.SendData(this.messageModel).subscribe((e) => {
        console.log(e);
        this.fg.reset();

      });
    } catch (error) {
      console.error(error); // Handle the error
    }

  };

  constructor() {

    this.chatService.message$.subscribe((msg) => {
      this.messages.push(msg);
    });

  }
  ngOnInit(): void {
    console.log()

    this.chatService.createConnection().startConnection()
    if (this.userId !== null) {
      // this.messageModel.idSender = JSON.parse(this.userId);
      // this.messageModel.idReceiver = this.Discussion;
      this.currentUserId = JSON.parse(this.userId);}
    // get all discussions of the connected user
    this.discService.getAllDiscussionsId(this.currentUserId).subscribe((d) => {
      this.discussions = d;
    });

    // form settings
    this.fg = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }
}
