import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as auth from 'firebase/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { OAuthCredential } from 'firebase/auth';

const SCOPE = 'https://www.googleapis.com/auth/youtube';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
})
export class SplashScreenComponent {
  title = 'Osiris';
  subtitle = 'YouTube Playlist Curator';

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private firebaseAuth: AngularFireAuth,
    private authService: AuthService<string>
  ) {}

  signIn(): any {
    let provider = new auth.GoogleAuthProvider().addScope(SCOPE);

    return this.firebaseAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          let credential = result.credential as OAuthCredential;
          let expiration: Date = new Date(new Date().getTime() + 30 * 60000);
          this.authService.setAuthentication(
            credential.accessToken!,
            expiration
          );
          this.router.navigate(['/load']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
