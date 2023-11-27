import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  token = '';

  constructor() {
    try {
      this.token = this.getItem('token') as string
    } catch (error) {
      console.error(error)
      this.token = ''
    }
  }


    getItem(key: string): string | null {
      return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
      localStorage.setItem(key, value);
    }

    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
  }
