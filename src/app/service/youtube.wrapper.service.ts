import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { orderedPlaylistItems } from '../functions/compare';
import { applyTimeConstraint } from '../functions/filter';
import { PlaylistItem } from '../model/playlist-item';
import { VideoInfo } from '../model/video-info';
import { YoutubeService } from './youtube.service';

@Injectable({
  providedIn: 'root',
})
export class YoutubeWrapperService {
  constructor(private youtubeService: YoutubeService) {}

  public getSubscribedChannelIds(): Observable<string[]> {
    if (localStorage.getItem('subscriptions') !== null) {
      return of(localStorage.getItem('subscriptions')!.split(','));
    } else {
      return this.youtubeService.getSubscriptions().pipe(
        map((subscriptions) => {
          let subscriptionIds: string[] = subscriptions
            .map((subscription) => subscription.snippet?.resourceId?.channelId)
            .filter((id): id is string => !!id);

          localStorage.setItem('subscriptions', subscriptionIds.join(','));
          return subscriptionIds;
        })
      );
    }
  }

  public getUploadPlaylistIds(channelIds: string[]): Observable<string[]> {
    if (localStorage.getItem('playlists') !== null) {
      return of(localStorage.getItem('playlists')!.split(','));
    } else {
      return this.youtubeService.getChannels(channelIds).pipe(
        map((channels) => {
          let playlistIds: string[] = channels
            .map((channel) => channel.contentDetails?.relatedPlaylists?.uploads)
            .filter((playlistId): playlistId is string => !!playlistId);

          localStorage.setItem('playlists', playlistIds.join(','));
          return playlistIds;
        })
      );
    }
  }

  public getPlaylistVideos(playlistIds: string[]): Observable<PlaylistItem[]> {
    return this.youtubeService
      .getUploadedVideos(playlistIds)
      .pipe(
        map((videos) =>
          videos.filter(applyTimeConstraint).sort(orderedPlaylistItems)
        )
      );
  }

  public getVideoInfo(videoIds: string[]): Observable<VideoInfo[]> {
    return this.youtubeService.getVideoInfo(videoIds);
  }
}
