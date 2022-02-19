import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "angularx-social-login";

import { Router } from '@angular/router';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.css']
})
export class ErrorScreenComponent implements OnInit {

  user!: SocialUser;

  constructor(private router: Router, private authService: SocialAuthService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(user => {
      this.user = user;
    });

    if (!this.user) {
      this.router.navigate(["/"]);
    }
  }

}
