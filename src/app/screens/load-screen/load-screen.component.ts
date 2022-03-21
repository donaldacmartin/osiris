import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistItem } from 'src/app/model/playlist-item';
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
    private videoStorageService: VideoStorageService
  ) {}

  ngOnInit(): void {
    this.downloadSubscriptions();
  }

  private downloadSubscriptions() {
    this.message = 'Getting subscriptions';

    this.youtubeWrapperService.getSubscribedChannelIds().subscribe({
      next: (channelIds) => this.downloadPlaylists(channelIds),
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

  private downloadPlaylists(channelIds: string[]) {
    this.message = 'Getting playlists';

    this.youtubeWrapperService.getUploadPlaylistIds(channelIds).subscribe({
      next: (playlistIds) => {
        this.downloadVideos(playlistIds);
      },
      error: () =>
        this.router.navigateByUrl('/error', {
          state: {
            errorCode: 'API_ERROR',
            errorText:
              "Couldn't get the the playlists for your subscriptions, please try again.",
            returnUrl: '/load',
          },
        }),
    });
  }

  private downloadVideos(playlistIds: string[]) {
    this.message = 'Getting videos';

    this.youtubeWrapperService.getPlaylistVideos(playlistIds).subscribe({
      next: (videos) => {
        this.supplementVideoInfo(videos);
      },
      error: () =>
        this.router.navigateByUrl('/error', {
          state: {
            errorCode: 'API_ERROR',
            errorText:
              "Couldn't get the videos your subscriptions uploaded, please try again.",
            returnUrl: '/load',
          },
        }),
    });
  }

  private supplementVideoInfo(videos: PlaylistItem[]) {
    this.message = 'Getting extra video info';

    let videoIds = videos.map((v) => v.snippet?.resourceId?.videoId!);
    this.youtubeWrapperService.getVideoInfo(videoIds).subscribe({
      next: (data) => {
        console.log(data);

        this.videoStorageService.storeLoadedVideos(videos);
        this.router.navigate(['/select']);
      },
      error: () =>
        this.router.navigateByUrl('/error', {
          state: {
            errorCode: 'API_ERROR',
            errorText:
              "Couldn't get the extra video information we need, please try again.",
            returnUrl: '/load',
          },
        }),
    });
  }
}
