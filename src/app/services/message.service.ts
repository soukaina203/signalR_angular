import { Message } from 'src/app/Models/Message';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
    private apiUrl = environment.messageApi;
    private http = inject(HttpClient)
    fetchData(): Observable<Message[]> {
      return this.http.get<Message[]>(this.apiUrl).pipe(
        catchError((error) => throwError('An error occurred while fetching data'))
      );
    }

    SendData(message: Message): Observable<any> {
      return this.http.post(this.apiUrl, message).pipe(
        catchError((error) => throwError(error))
      );
    }

    DeleteData(id: number | null): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`).pipe(
        catchError((error) => throwError('An error occurred while deleting data'))
      );
    }

    getMessage(id: number): Observable<Message> {
      return this.http.get<Message>(`${this.apiUrl}/${id}`).pipe(
        catchError((error) => throwError('An error occurred while getting Message details'))
      );
    }

    updateMessage(id: string | null, data: Message): Observable<any> {
      return this.http.patch(`${this.apiUrl}/${id}`, data).pipe(
        catchError((error) => throwError('An error occurred while updating the Message'))
      );
    }


    createMessage(Message: Message): Observable<any> {
      return this.http.post(this.apiUrl, Message).pipe(
        catchError((error) => throwError('An error occurred while creating the Message'))
      );
    }

    getMessagesOfDisscution(id:number):Observable<any>{
      return this.http.get<Message[]>(`${this.apiUrl}/${id}`);
    }

}
