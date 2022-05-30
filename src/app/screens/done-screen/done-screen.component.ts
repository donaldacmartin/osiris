import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-done-screen',
  templateUrl: './done-screen.component.html',
  styleUrls: ['./done-screen.component.css'],
})
export class DoneScreenComponent {
  private reloadUri = '/';

  title = 'All done!';
  message = 'Come back tomorrow for another playlist';

  constructor(private router: Router) {}

  restart() {
    this.router.navigate([this.reloadUri]);
  }

}

