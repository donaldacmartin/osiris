import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthWrapperService } from 'src/app/service/auth-wrapper.service';

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
    private router: Router,
    private authWrapperService: AuthWrapperService,
  ) {}

  signIn(): any {
    this.authWrapperService.signIn().subscribe(result => {
      if (result) {
        this.router.navigate(['/load']);
      } else {
        window.alert("Sign-in failed");
      }
    });
  }
}
