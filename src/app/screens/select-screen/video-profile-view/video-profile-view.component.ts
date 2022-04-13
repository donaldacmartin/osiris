import { Component, Input } from '@angular/core';
import { readableDuration } from 'src/app/functions/transform';
import { Video } from 'src/app/model/video';

@Component({
  selector: 'app-video-profile-view',
  templateUrl: './video-profile-view.component.html',
  styleUrls: ['./video-profile-view.component.css'],
})
export class VideoProfileViewComponent {
  @Input()
  video?: Video;

  constructor() {}

  getDuration(): string {
    console.log(this.video!);
    return readableDuration(this.video?.duration!);
  }
}
