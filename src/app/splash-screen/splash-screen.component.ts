import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

import { Router } from '@angular/router';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent implements OnInit {

  title: String = "Osiris";
  subtitle: String = "YouTube Playlist Curator";

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      if (user) {
        this.router.navigate(
          ["/error"],
          {state:
            {errorCode: "Not yet implemented",
            errorText: `Hello, ${user.name}: this feature is not yet ready`
          }})
      }
    });
  }

  signIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
