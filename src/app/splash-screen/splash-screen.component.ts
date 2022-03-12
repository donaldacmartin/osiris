import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
})
export class SplashScreenComponent implements OnInit {
  title: String = 'Osiris';
  subtitle: String = 'YouTube Playlist Curator';

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      if (user) {
        localStorage.setItem('token', user.authToken);
        this.router.navigate(['/load']);
      } else {
        this.router.navigate(['/error'], {
          state: {
            errorCode: 'Authentication failed',
            errorText: 'Something went wrong while authenticating with Google',
          },
        });
      }
    });
  }

  signIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
