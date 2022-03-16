import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.css'],
})
export class ErrorScreenComponent {
  titleText: String = 'Something went wrong!';

  errorCode: String = '';
  errorText: String = '';
  returnUrl: String = '';

  constructor(private router: Router) {
    this.errorCode =
      this.router.getCurrentNavigation()?.extras.state?.['errorCode'];
    this.errorText =
      this.router.getCurrentNavigation()?.extras.state?.['errorText'];
    this.returnUrl =
      this.router.getCurrentNavigation()?.extras.state?.['returnUrl'];
  }

  redirect() {
    this.router.navigate([this.returnUrl]);
  }
}
