import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { OAuthCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

const SCOPE = 'https://www.googleapis.com/auth/youtube';

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
    return this.token !== '';
  }

  getToken(): string {
    return this.token;
  }
}
