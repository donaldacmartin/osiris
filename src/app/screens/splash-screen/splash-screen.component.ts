import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthWrapperService } from 'src/app/service/auth-wrapper.service';

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
    private authWrapperService: AuthWrapperService
  ) {}

  ngOnInit(): void {
    if (this.authWrapperService.isAuthenticated()) {
      this.router.navigate(['/load']);
    } else {
      this.authWrapperService
        .hasAuthenticatedFromRedirect()
        .subscribe((result) => {
          if (result) {
            this.router.navigate(['/load']);
          }
        });
    }
  }

  signIn(): any {
    this.authWrapperService.signIn();
  }
}
