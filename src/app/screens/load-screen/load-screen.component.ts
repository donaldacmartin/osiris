import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoStorageService } from 'src/app/service/video.storage.service';
import { orderedPlaylistItems } from '../../functions/compare';
import { applyTimeConstraint } from '../../functions/filter';
import { YoutubeService } from '../../service/youtube.service';

@Component({
  selector: 'app-load-screen',
  templateUrl: './load-screen.component.html',
  styleUrls: ['./load-screen.component.css'],
})
export class LoadSubscriptionsScreenComponent implements OnInit {
  message: String = '';

  constructor(
    private router: Router,
    private youtube: YoutubeService,
    private videoStorageService: VideoStorageService
  ) {}

  ngOnInit(): void {
    this.downloadSubscriptions();
  }

  private downloadSubscriptions() {
    this.message = 'Getting subscriptions';

    if (localStorage.getItem('subscriptions') == null) {
      this.youtube.getSubscriptions().subscribe((subscriptions) => {
        let subscriptionIds: string[] = subscriptions
          .map((subscription) => subscription.snippet?.resourceId?.channelId)
          .filter((id): id is string => !!id);

        let subscriptionsStr = subscriptionIds.join(',');
        localStorage.setItem('subscriptions', subscriptionsStr);
        this.downloadPlaylists();
      });
    } else {
      this.downloadPlaylists();
    }
  }

  private downloadPlaylists() {
    this.message = 'Getting playlists';

    if (localStorage.getItem('playlists') == null) {
      this.youtube
        .getChannels(localStorage.getItem('subscriptions')!.split(','))
        .subscribe((channels) => {
          let playlistIds: string[] = channels
            .map((channel) => channel.contentDetails?.relatedPlaylists?.uploads)
            .filter((playlistId): playlistId is string => !!playlistId);

          let playlistIdsStr = playlistIds.join(',');
          localStorage.setItem('playlists', playlistIdsStr);
          this.downloadVideos();
        });
    } else {
      this.downloadVideos();
    }
  }

  private downloadVideos() {
    this.message = 'Getting videos';

    this.youtube
      .getUploadedVideos(localStorage.getItem('playlists')!.split(','))
      .subscribe((videos) => {
        let relevantVideos = videos
          .filter(applyTimeConstraint)
          .sort(orderedPlaylistItems);

        this.videoStorageService.storeLoadedVideos(relevantVideos);
        this.router.navigate(['/select']);
      });
  }
}
