import { Injectable } from '@angular/core';
import {
  EMPTY,
  expand,
  Observable,
  reduce,
  forkJoin,
  map,
  switchMap,
  from,
  mergeMap,
} from 'rxjs';

import { Subscription } from '../model/subscription';
import { Channel } from '../model/channel';
import { YouTubeResponse } from '../model/generic-response';
import { YoutubeApiService } from '../api/youtube-api.service';
import { chunk } from '../functions/transform';
import { PlaylistItem, PlaylistItemResourceId } from '../model/playlist-item';
import { AuthService } from './auth.service';

const MAX_SUBSCRIPTIONS = 50;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(
    private youtubeApi: YoutubeApiService,
    private authService: AuthService<string>
  ) {}

  getSubscriptions(): Observable<Subscription[]> {
    return this.youtubeApi
      .getSubscriptions(this.authService.getAuthentication())
      .pipe(
        expand((res) =>
          res.nextPageToken
            ? this.youtubeApi.getSubscriptions(
                this.authService.getAuthentication(),
                res.nextPageToken
              )
            : EMPTY
        ),
        reduce(
          (acc: Subscription[], current: YouTubeResponse<Subscription>) =>
            acc.concat(current.items || []),
          []
        )
      );
  }

  getChannels(channelIds: string[]): Observable<Channel[]> {
    let channelIdGroups = chunk(channelIds, MAX_SUBSCRIPTIONS);

    let responseObservables: Observable<Channel[]>[] = channelIdGroups.map(
      (group) => {
        return this.youtubeApi
          .getChannels(group, this.authService.getAuthentication())
          .pipe(
            expand((res) =>
              res.nextPageToken
                ? this.youtubeApi.getChannels(
                    group,
                    this.authService.getAuthentication(),
                    res.nextPageToken
                  )
                : EMPTY
            ),
            reduce(
              (acc: Channel[], current: YouTubeResponse<Channel>) =>
                acc.concat(current.items || []),
              []
            )
          );
      }
    );

    return forkJoin(responseObservables).pipe(
      reduce(
        (acc: Channel[], current: Channel[][]) =>
          acc.concat(...(current || [])),
        []
      )
    );
  }

  getUploadedVideos(playlistIds: string[]): Observable<PlaylistItem[]> {
    let playlistObservables: Observable<PlaylistItem[]>[] = playlistIds.map(
      (playlistId) => {
        return this.youtubeApi
          .getPlaylistItems(playlistId, this.authService.getAuthentication())
          .pipe(map((youtubeResponse) => youtubeResponse.items || []));
      }
    );

    return forkJoin(playlistObservables).pipe(
      reduce(
        (acc: PlaylistItem[], current: PlaylistItem[][]) =>
          acc.concat(...(current || [])),
        []
      )
    );
  }

  createPlaylist(
    title: string,
    items: PlaylistItemResourceId[]
  ): Observable<any> {
    return this.youtubeApi
      .createPlaylist(title, this.authService.getAuthentication())
      .pipe(
        switchMap((response) => {
          let playlistId = response.id;

          return from(items).pipe(
            mergeMap(
              (item) =>
                this.youtubeApi.addToPlaylist(
                  playlistId!,
                  item,
                  this.authService.getAuthentication()
                ),
              1
            )
          );
        })
      );
  }
}
