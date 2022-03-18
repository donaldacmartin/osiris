import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
})
export class SplashScreenComponent implements OnInit {
  title = 'Osiris';
  subtitle = 'YouTube Playlist Curator';

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private localAuthService: AuthService<string>
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        let expiration: Date = new Date(new Date().getTime() + 30 * 60000);
        this.localAuthService.setAuthentication(user.authToken, expiration);
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
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
}
