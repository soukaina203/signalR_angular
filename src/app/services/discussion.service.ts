import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Discussion } from '../Models/Discussion';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  private apiUrl = environment.DiscussionApi;
  constructor(private http: HttpClient) { }

  fetchData(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>("http://localhost:5000/api/Discussion");
  }


  getAllDiscussionsId(idUser:number ):Observable<any> {
    return this.http.get(`${this.apiUrl}/custom/${idUser}`);
  }

  SendData(data: object): Observable<any> {
    return this.http.post(this.apiUrl, data).pipe(
      catchError((error) => throwError('An error occurred while sending data'))
    );
  }

  DeleteData(id: number  | null): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => throwError('An error occurred while deleting data'))
    );
  }

  getDiscussion(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => throwError('An error occurred while getting Discussion details'))
    );
  }

  updateDiscussion(id: string | null, data: Discussion): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, data).pipe(
      catchError((error) => throwError('An error occurred while updating the Discussion'))
    );
  }

  createDiscussion(Discussion: Discussion): Observable<any> {
    return this.http.post(this.apiUrl, Discussion).pipe(
      catchError((error) => throwError('An error occurred while creating the Discussion'))
    );
  }
}


