import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discussion } from 'src/app/Models/Discussion';
import { Message } from 'src/app/Models/Message';
import { ChatService } from 'src/app/services/chat.service';
import { DiscussionService } from 'src/app/services/discussion.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'chat-ui',
  templateUrl: './chat-ui.component.html',
})
export class ChatUiComponent {

  discService = inject(DiscussionService);
  messageService = inject(MessageService);
  messageModel: Message = new Message()
  openChat:boolean=false

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
  nameOfperson:string;
  DiscussionChoosed = (id: number) => {

    // message model
    this.messageModel.idDiscussion = id
  // retreive related messages of a specific discussion
    this.messageService.getMessagesOfDisscution(id).subscribe((res) => {
      // old messages of the discussion
      this.MessagesOfDiscussion = res.messages;
      // message model
      this.messageModel.idReceiver = res.discussion.idReceiver
      if(this.currentUserId===res.discussion.idReceiver){
     this.nameOfperson=res.discussion.sender_name
      }else{
        this.nameOfperson=res.discussion.receiver_name

      }
      this.openChat=true

    });
  };

  sendMessage = () => {
    // message value
    // fill the instance content

    this.messageModel.content = this.fg.value.message

    this.messageService.SendData(this.messageModel).subscribe((e) => {
      // send message to the server
      this.chatService.SendMessage(this.messageModel)

    })
  };

  constructor() {
    this.chatService.messages$.subscribe(msg => {

      this.messages.push(msg)
    });
  }
  ngOnInit(): void {

    // fill the instance content
    var userId = localStorage.getItem('userId');
    if (userId !== null) {
      this.messageModel.idSender = JSON.parse(userId)
      this.currentUserId=JSON.parse(userId)
    }


    // get all discussions of the connected user
    this.discService.getAllDiscussionsId( this.currentUserId).subscribe((d) => {
      this.discussions = d;
    });


    // form settings
    this.fg = this.formBuilder.group({
      message: ['', Validators.required],
    });



  }
}
