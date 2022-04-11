import { Component, Input } from '@angular/core';
import { readableDuration } from 'src/app/functions/transform';
import { Video } from 'src/app/model/video';

const HOURS_REGEX = /\d+H/g;
const MINS_REGEX = /\d+M/g;
const SECS_REGEX = /\d+S/g;

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
    return readableDuration(this.video?.duration!);
  }
}
