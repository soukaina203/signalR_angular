import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Discussion } from '../Models/Discussion';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DiscussionService {
  readonly controller = 'Discussion'
  constructor(private http: HttpClient) { }

  fetchData(): Observable<Discussion[]> {
    return this.http.get<Discussion[]>("http://localhost:5000/api/Discussion");
  }


  getAllDiscussionsId(idUser:number ):Observable<any> {
    return this.http.get(`${environment.urlApi}/${this.controller}/custom/${idUser}`);
  }

  SendData(data: object): Observable<any> {
    return this.http.post(`${environment.urlApi}`, data).pipe(
      catchError((error) => throwError('An error occurred while sending data'))
    );
  }

  DeleteData(id: number  | null): Observable<any> {
    return this.http.delete(`${environment.urlApi}/${this.controller}/${id}`).pipe(
      catchError((error) => throwError('An error occurred while deleting data'))
    );
  }

  getDiscussion(id: number): Observable<Discussion> {
    return this.http.get<Discussion>(`${environment.urlApi}/${this.controller}/${id}`).pipe(
      catchError((error) => throwError('An error occurred while getting Discussion details'))
    );
  }

  updateDiscussion(id: string | null, data: Discussion): Observable<any> {
    return this.http.patch(`${environment.urlApi}/${this.controller}/${id}`, data).pipe(
      catchError((error) => throwError('An error occurred while updating the Discussion'))
    );
  }

  createDiscussion(Discussion: Discussion): Observable<any> {
    return this.http.post(`${environment.urlApi}/${this.controller}`, Discussion).pipe(
      catchError((error) => throwError('An error occurred while creating the Discussion'))
    );
  }
}


