import { Message } from 'src/app/Models/Message';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  readonly controller = 'Message'

    private http = inject(HttpClient)
    fetchData(): Observable<Message[]> {
      return this.http.get<Message[]>(`${environment.urlApi}/${this.controller}`)
    }

    SendData(message: Message): Observable<any> {
      return this.http.post(`${environment.urlApi}/${this.controller}`, message)
    }

    DeleteData(id: number | null): Observable<any> {
      return this.http.delete(`${environment.urlApi}/${this.controller}/${id}`)
    }

    getMessage(id: number): Observable<Message> {
      return this.http.get<Message>(`${environment.urlApi}/${this.controller}/${id}`)
    }

    updateMessage(id: string | null, data: Message): Observable<any> {
      return this.http.patch(`${environment.urlApi}/${this.controller}/${id}`, data)
    }


    createMessage(Message: Message): Observable<any> {
      return this.http.post(`${environment.urlApi}/${this.controller}`, Message)
    }

    getMessagesOfDisscution(id:number):Observable<any>{
      return this.http.get<Message[]>(`${environment.urlApi}/${this.controller}/${id}`);
    }

}
