import { Component, NgZone, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

const CLIENT_ID =
  '381100539388-gheh626i6nmai4m4hgi6m7urbpf2l9a6.apps.googleusercontent.com';
const SCOPE = 'https://www.googleapis.com/auth/youtube';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.css'],
})
export class SplashScreenComponent implements OnInit {
  title = 'Osiris';
  subtitle = 'YouTube Playlist Curator';
  client: any;

  constructor(
    private ngZone: NgZone,
    private router: Router,
    private authService: AuthService<string>
  ) {}

  ngOnInit(): void {
    this.client = (window as any).google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPE,
      callback: (response: any) =>
        this.ngZone.run(() => {
          let expiration: Date = new Date(new Date().getTime() + 30 * 60000);
          this.authService.setAuthentication(response.access_token, expiration);
          this.router.navigate(['/load']);
        }),
    });
  }

  signIn(): void {
    this.client.requestAccessToken();
  }
}
