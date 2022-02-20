import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

const DEFAULT_CODE = "Unknown error";
const DEFAULT_MSG = "An error has occurred, but no information was provided";

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.css']
})
export class ErrorScreenComponent implements OnInit {
  
  titleText: String = "Something went wrong!";

  errorCode: String = "";
  errorText: String = "";

  constructor(private router: Router) {
    this.errorCode = this.router.getCurrentNavigation()?.extras.state?.['errorCode'];
    this.errorText = this.router.getCurrentNavigation()?.extras.state?.['errorText'];
  }

  ngOnInit(): void {
    this.errorCode = this.router.getCurrentNavigation()?.extras.state!['errorCode'];
    this.errorText = this.router.getCurrentNavigation()?.extras.state!['errorText'];
  }

  redirect() {
    this.router.navigate(["/"]);
  }

}
