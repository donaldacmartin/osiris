import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoStorageService } from 'src/app/service/video.storage.service';
import { YoutubeWrapperService } from 'src/app/service/youtube.wrapper.service';

@Component({
  selector: 'app-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.css'],
})
export class LoadSubscriptionsScreenComponent implements OnInit {
  message: String = '';

  constructor(
    private router: Router,
    private youtubeWrapperService: YoutubeWrapperService,
    private videoStorageService: VideoStorageService,
  ) {}

  ngOnInit(): void {
    this.downloadSubscriptions();
  }

  private downloadSubscriptions() {
    this.message = 'Getting subscriptions';

    this.youtubeWrapperService.getSubscribedChannelIds().subscribe({
      next: (channelIds) => this.downloadVideos(channelIds),
      error: () =>
        this.router.navigateByUrl('/error', {
          state: {
            errorCode: 'API_ERROR',
            errorText:
              "Couldn't get the channels you are subscribed to, please try again.",
            returnUrl: '/load',
          },
        }),
    });
  }

  private downloadVideos(channelIds: string[]) {
    this.message = 'Getting videos';

    this.youtubeWrapperService.getVideos(channelIds).subscribe({
      next: (videos) => {
        this.videoStorageService.storeLoadedVideos(videos);
        this.router.navigate(['/select']);
      },
      error: () =>
        this.router.navigateByUrl('/error', {
          state: {
            errorCode: 'API_ERROR',
            errorText:
              "Couldn't get your subscription videos, please try again.",
            returnUrl: '/load',
          },
        }),
    });
  }
}
