import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/model/video';
import { StorageService } from 'src/app/service/storage.service';
import { VideoStorageService } from 'src/app/service/video.storage.service';
import { playlistTitle } from '../../functions/provide';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-sort-screen',
  templateUrl: './sort-screen.component.html',
  styleUrls: ['./sort-screen.component.css'],
})
export class SortScreenComponent implements OnInit {
  message = "Let's sort your videos";
  videos: Video[] = [];

  constructor(
    private youtubeService: YoutubeService,
    private videoStorageService: VideoStorageService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.videos = this.videoStorageService.getAcceptedVideos();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.videos, event.previousIndex, event.currentIndex);
  }

  done() {
    let resources = this.videos.map((video) => {
      return { kind: 'youtube#video', videoId: video.id };
    });

    this.storageService.saveVideos(this.videos);

    this.youtubeService.createPlaylist(playlistTitle(), resources).subscribe({
      next: () => this.router.navigate(['/done']),
      error: () =>
        this.router.navigateByUrl('/error', {
          state: {
            errorCode: 'API_ERROR',
            errorText:
              "Couldn't create a playlist of your subscriptions. Please try again.",
            returnUrl: '/sort',
          },
        }),
    });
  }
}
