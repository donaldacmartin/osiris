import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { orderedPlaylistItems } from '../functions/compare';
import { applyTimeConstraint } from '../functions/filter';
import { YoutubeService } from '../service/youtube.service';

@Component({
  selector: 'app-load-subscriptions-screen',
  templateUrl: './load-subscriptions-screen.component.html',
})
export class LoadSubscriptionsScreenComponent implements OnInit {
  message: String = '';

  constructor(private router: Router, private youtube: YoutubeService) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.downloadSubscriptions();
    } else {
      this.router.navigate(['/']);
    }
  }

  private downloadSubscriptions() {
    this.message = 'Getting subscriptions';

    if (localStorage.getItem('subscriptions') == null) {
      this.youtube
        .getSubscriptions(localStorage.getItem('token')!)
        .subscribe((subscriptions) => {
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
        .getChannels(
          localStorage.getItem('subscriptions')!.split(','),
          localStorage.getItem('token')!
        )
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
      .getUploadedVideos(
        localStorage.getItem('playlists')!.split(','),
        localStorage.getItem('token')!
      )
      .subscribe((videos) => {
        let relevantVideos = videos
          .filter(applyTimeConstraint)
          .sort(orderedPlaylistItems);

        localStorage.setItem('videos', JSON.stringify(relevantVideos));
        this.router.navigate(['/select']);
      });
  }
}
