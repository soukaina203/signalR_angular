import { Injectable, Inject } from '@angular/core';
import { HubConnectionBuilder, HubConnection, IHttpConnectionOptions, LogLevel } from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../Models/Message';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  message$ = new Subject<Message>();
  messageDeleted = new Subject<number>();
  updateNotifFromChatComponent = new Subject <number>();
  notificationReceived = new Subject<any>();

  private hubConnection: HubConnection;

  constructor(private session: SessionService) { }


  public createConnection() {
    console.warn(this.session.token)

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.url + '/ChatHub', { accessTokenFactory: () => this.session.token } as IHttpConnectionOptions)
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .configureLogging(LogLevel.None)
      .build();

    return this;
  }

  public startConnection(): void {
    this.hubConnection.start().then(async (r) => {
      console.log(r)
      console.error('Hub connection started');

      this.hubConnection.on('RecieveMessage', res => {
        console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><')
        console.warn(res)
        console.warn('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><')
        this.message$.next(res)
      });
      this.hubConnection.on('deleteMessage', res => this.messageDeleted.next(res));

      this.hubConnection.on('notification', res => this.notificationReceived.next(res));

      this.hubConnection.on('innerException', res => {
        console.warn('##################################################################');
        console.warn(res);
        console.warn('##################################################################');
      });

    }).catch(e => {
      console.warn('Error while establishing connection signalr : ', e);
    });
  }

  public stopConnection() {
    this.hubConnection.stop().then(r => console.warn(r))
  }

}
