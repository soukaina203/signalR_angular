
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discussion } from 'src/app/Models/Discussion';
import { Message } from 'src/app/Models/Message';
import { ChatService } from 'src/app/services/chat.service';
import { DiscussionService } from 'src/app/services/discussion.service';
import { MessageService } from 'src/app/services/message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chat-ui',
  templateUrl: './chat-ui.component.html',
})
export class ChatUiComponent {

  discService = inject(DiscussionService);
  messageService = inject(MessageService);
  messageModel: Message = new Message()

  // store the sended msgs
  messages: any[] = [];

  chatService = inject(ChatService);
  fg!: FormGroup;
  // sending data to the message table in the database


  formBuilder = inject(FormBuilder);
  discussions!: Discussion[];
  MessagesOfDiscussion: Message[];
  any = localStorage.getItem('userId');
  currentUserId: number;
  currentUserMsgs: Message[];
  otherUserMsgs: Message[];
  DiscussionChoosed = (id: number) => {

    // message model
    this.messageModel.idDiscussion = id

    this.messageService.getMessagesOfDisscution(id).subscribe((res) => {
      // old messages of the discussion

      this.MessagesOfDiscussion = res.messages;
      var length=this.MessagesOfDiscussion.length
      // message model
      this.messageModel.idReceiver = res.discussion.idReceiver




    });
  };

  sendMessage = () => {
    // message value
    // fill the instance content
console.log("hello")

    this.messageModel.content = this.fg.value.message
    console.log(this.messageModel)
    this.chatService.SendMessage(this.messageModel).then((e)=>{})

    this.MessagesOfDiscussion=[...this.MessagesOfDiscussion,this.messageModel]

    // send message to the server
    this.messageService.SendData(this.messageModel).subscribe((e) => {
    })
    console.log(this.MessagesOfDiscussion)
  };


  ngOnInit(): void {
    // fill the instance content
    var userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.messageModel.idSender = JSON.parse(userId)
      this.currentUserId=JSON.parse(userId)
    }


    // get all discussions
    this.discService.getAllDiscussionsId( this.currentUserId).subscribe((d) => {
      this.discussions = d;
    });


    // form settings
    this.fg = this.formBuilder.group({
      message: ['', Validators.required],
    });

    this.chatService.messages$.subscribe((res) => {
      console.log(this.chatService.messages$)
      this.messages = this.MessagesOfDiscussion;

    });
  }
}
