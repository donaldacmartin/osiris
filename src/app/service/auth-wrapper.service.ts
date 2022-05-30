import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, OAuthCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

const SCOPE = 'https://www.googleapis.com/auth/youtube';
const LOCAL_STORAGE_AUTH_NAME = '@osiris/auth-token';
const LOCAL_STORAGE_AUTH_TTL = '@osis/auth-ttl';

@Injectable({
  providedIn: 'root',
})
export class AuthWrapperService {
  private token: string = '';

  constructor(private firebaseAuth: AngularFireAuth) {}

  signIn(): void {
    let provider = new GoogleAuthProvider().addScope(SCOPE);
    this.firebaseAuth.signInWithRedirect(provider);
  }

  hasAuthenticatedFromRedirect(): Observable<boolean> {
    let promise = this.firebaseAuth
      .getRedirectResult()
      .then((result) => {
        if (result !== null && result.credential !== null) {
          let credential = result.credential as OAuthCredential;

          if (credential.accessToken) {
            this.token = credential.accessToken;
            this.setStoredToken(credential.accessToken);
            return true;
          }

          return false;
        }

        return false;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });

    return from(promise);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== '';
  }

  getToken(): string {
    if (this.token === '') {
      this.token = this.getStoredToken();
    }

    return this.token;
  }

  private getStoredToken(): string {
    let storedToken = localStorage.getItem(LOCAL_STORAGE_AUTH_NAME);
    let storedTtl = localStorage.getItem(LOCAL_STORAGE_AUTH_TTL);

    if (
      storedToken !== undefined &&
      storedToken !== null &&
      storedTtl !== undefined &&
      storedTtl !== null &&
      parseInt(storedTtl) > Date.now()
    ) {
      return storedToken;
    } else {
      return '';
    }
  }

  private setStoredToken(token: string): void {
    localStorage.setItem(LOCAL_STORAGE_AUTH_NAME, token);
    localStorage.setItem(LOCAL_STORAGE_AUTH_TTL, this.getOAuthExpiry());
  }

  private getOAuthExpiry(): string {
    return Date.now() + 60000 + '';
  }
}
