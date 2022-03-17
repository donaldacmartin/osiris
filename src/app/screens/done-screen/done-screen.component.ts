import { Component } from '@angular/core';

@Component({
  selector: 'app-done-screen',
  templateUrl: './done-screen.component.html',
  styleUrls: ['./done-screen.component.css'],
})
export class DoneScreenComponent {
  title = 'All done!';
  message = 'Come back tomorrow for another playlist';

  constructor() {}
}
