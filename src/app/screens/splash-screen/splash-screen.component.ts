import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
})
export class SplashScreenComponent implements OnInit {
  title: String = 'Osiris';
  subtitle: String = 'YouTube Playlist Curator';

  constructor(
    private router: Router,
    private socialAuthService: SocialAuthService,
    private localAuthService: AuthService<string>
  ) {}

  ngOnInit(): void {
    this.socialAuthService.authState.subscribe((user) => {
      if (user) {
        let expiration = moment().add(30, 'minutes').toDate();
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
