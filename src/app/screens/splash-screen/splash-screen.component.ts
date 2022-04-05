import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import * as auth from 'firebase/auth';

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
    private firebaseAuth: AngularFireAuth
  ) {}

  signIn(): any {
    let provider = new auth.GoogleAuthProvider().addScope(SCOPE);

    return this.firebaseAuth
      .signInWithPopup(provider)
      .then(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/load']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }
}
