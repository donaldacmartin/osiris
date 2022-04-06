import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { OAuthCredential } from 'firebase/auth';
import { from, Observable } from 'rxjs';

const SCOPE = 'https://www.googleapis.com/auth/youtube';

@Injectable({
  providedIn: 'root',
})
export class AuthWrapperService {
  private token: string = '';

  constructor(private firebaseAuth: AngularFireAuth, private ngZone: NgZone) {}

  signIn(): Observable<boolean> {
    let provider: AuthProvider = new GoogleAuthProvider().addScope(SCOPE);

    let promise: Promise<boolean> = this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        return this.ngZone.run(() => {
          let credential = result.credential as OAuthCredential;

          if (credential.accessToken) {
            this.token = credential.accessToken;
            return true;
          } else {
            return false;
          }
        });
      })
      .catch(() => {
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
