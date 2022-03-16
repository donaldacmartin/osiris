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
    private videoStorageService: VideoStorageService
  ) {}

  ngOnInit(): void {
    this.downloadSubscriptions();
  }

  private downloadSubscriptions() {
    this.message = 'Getting subscriptions';

    this.youtubeWrapperService
      .getSubscribedChannelIds()
      .subscribe((channelIds) => {
        this.downloadPlaylists(channelIds);
      });
  }

  private downloadPlaylists(channelIds: string[]) {
    this.message = 'Getting playlists';

    this.youtubeWrapperService
      .getUploadPlaylistIds(channelIds)
      .subscribe((playlistIds) => {
        this.downloadVideos(playlistIds);
      });
  }

  private downloadVideos(playlistIds: string[]) {
    this.message = 'Getting videos';

    this.youtubeWrapperService
      .getPlaylistVideos(playlistIds)
      .subscribe((videos) => {
        this.videoStorageService.storeLoadedVideos(videos);
        this.router.navigate(['/select']);
      });
  }
}
