import { Injectable } from '@angular/core';
import { User } from '../Models/User';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  data: User[] = [];
  constructor() { }
  addNote(object: User): Observable<string> {
    return new Observable((subscriber) => {
      this.data.push(object);
      subscriber.next('Note added successfully!');
      subscriber.complete();
    });
  }

  removeNote(name:string): Observable<User[]>{
    return new Observable((subscriber) => {
      this.data=this.data.filter(e=>e.name!==name)
      subscriber.next(this.data);
      subscriber.complete();
    });
  }
}
