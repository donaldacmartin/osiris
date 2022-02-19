import { Component } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css']
})
export class SplashScreenComponent {

  title: String = "Osiris";
  subtitle: String = "YouTube Playlist Curator";

  constructor(private authService: SocialAuthService) {}

  signIn(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

}
