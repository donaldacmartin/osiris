import { Component, OnInit } from '@angular/core';
import {
  PlaylistItem,
  PlaylistItemResourceId,
  PlaylistItemThumbnail,
} from '../model/playlist-item';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { YoutubeService } from '../service/youtube.service';
import { playlistTitle } from '../functions/provide';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sort-screen',
  templateUrl: './sort-screen.component.html',
  styleUrls: ['./sort-screen.component.css'],
})
export class SortScreenComponent implements OnInit {
  message = "Let's sort your videos";
  videos: PlaylistItem[] = [];

  constructor(private youtubeService: YoutubeService, private router: Router) {}

  ngOnInit(): void {
    this.videos = JSON.parse(localStorage.getItem('unsortedVideos')!);
    console.log(this.videos);
  }

  getImgSrc(video: PlaylistItem): string {
    let thumbnails =
      new Map(Object.entries(video?.snippet?.thumbnails!)) ||
      new Map<string, PlaylistItemThumbnail>();
    let standardThumbnail =
      thumbnails.get('high') || new PlaylistItemThumbnail();
    return standardThumbnail?.url || '';
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
  }

  done() {
    let resources = this.videos
      .map((video) => video.snippet?.resourceId)
      .filter(
        (resourceId): resourceId is PlaylistItemResourceId => !!resourceId
      );

    this.youtubeService
      .createPlaylist(
        playlistTitle(),
        resources,
        localStorage.getItem('token')!
      )
      .subscribe(() => this.router.navigate(['/done']));
  }
}
