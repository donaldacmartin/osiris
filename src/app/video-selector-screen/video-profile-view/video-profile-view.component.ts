import { Component, Input } from '@angular/core';
import {
  PlaylistItem,
  PlaylistItemThumbnail,
} from 'src/app/model/playlist-item';

@Component({
  selector: 'app-video-profile-view',
  templateUrl: './video-profile-view.component.html',
  styleUrls: ['./video-profile-view.component.css'],
})
export class VideoProfileViewComponent {
  @Input()
  video?: PlaylistItem;

  constructor() {}

  getImgSrc(): string {
    let thumbnails =
      new Map(Object.entries(this.video?.snippet?.thumbnails!)) ||
      new Map<string, PlaylistItemThumbnail>();
    let standardThumbnail =
      thumbnails.get('high') || new PlaylistItemThumbnail();
    return standardThumbnail?.url || '';
  }
}
