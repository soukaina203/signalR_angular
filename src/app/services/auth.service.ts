import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData:string;

  constructor(private http: HttpClient) { }
  signUp(user:User): Observable<any> {
    return this.http.post<User>("http://localhost:5000/api/Account/Register",user).pipe(
      catchError((error) => throwError(()=>{'An error occurred while sending data for signUp'}))
    );
  }

  login(user:User): Observable<any> {
    return this.http.post<User>("http://localhost:5000/api/Account/Login",user).pipe(

      catchError((error) => throwError(()=>{'An error occurred while sending data for login'}))
    )
  }

}
