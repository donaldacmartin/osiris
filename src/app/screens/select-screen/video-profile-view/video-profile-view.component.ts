import { Component, Input } from '@angular/core';
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

  getDuration(isoDuration: string): string {
    let hours = this.reMatch(HOURS_REGEX, isoDuration);
    let mins = this.reMatch(MINS_REGEX, isoDuration);
    let secs = this.reMatch(SECS_REGEX, isoDuration);

    return hours === '00' ? mins + ':' + secs : hours + ':' + mins + ':' + secs;
  }

  private reMatch(regex: RegExp, data: string): string {
    let match = regex.exec(data);
    return match && match.length > 0
      ? match[0].substring(0, match[0].length - 1)
      : '00';
  }
}
