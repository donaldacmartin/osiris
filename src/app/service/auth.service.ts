import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { AuthWrapper } from '../model/auth-wrapper';

@Injectable({
  providedIn: 'root',
})
export class AuthService<T> {
  isAuthenticated(): boolean {
    try {
      let auth = JSON.parse(localStorage.getItem('auth')!) as AuthWrapper<T>;
      return moment(auth.expiration).isAfter(moment());
    } catch (error) {
      return false;
    }
  }

  setAuthentication(auth: T, expiration: Date): void {
    let data = JSON.stringify(new AuthWrapper(expiration, auth));
    localStorage.setItem('auth', data);
  }

  getAuthentication(): T {
    let storage = JSON.parse(localStorage.getItem('auth')!) as AuthWrapper<T>;
    return storage.auth;
  }
}
