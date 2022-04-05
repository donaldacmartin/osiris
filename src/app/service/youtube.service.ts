import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { OAuthCredential } from 'firebase/auth';
import {
  EMPTY,
  expand,
  forkJoin,
  from,
  map,
  mergeMap,
  Observable,
  reduce,
  switchMap
} from 'rxjs';
import { YoutubeApiService } from '../api/youtube-api.service';
import { chunk } from '../functions/transform';
import { Channel } from '../model/youtube/channel';
import { YouTubeResponse } from '../model/youtube/generic-response';
import {
  PlaylistItem,
  PlaylistItemResourceId
} from '../model/youtube/playlist-item';
import { Subscription } from '../model/youtube/subscription';
import { VideoInfo } from '../model/youtube/video-info';

const MAX_SUBSCRIPTIONS = 50;

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  constructor(
    private youtubeApi: YoutubeApiService,
    private firebaseAuth: AngularFireAuth
  ) {}

  getSubscriptions(): Observable<Subscription[]> {
    return this.getAuth().pipe(
      mergeMap((auth) => {
        return this.youtubeApi.getSubscriptions(auth).pipe(
          expand((res) =>
            res.nextPageToken
              ? this.youtubeApi.getSubscriptions(auth, res.nextPageToken)
              : EMPTY
          ),
          reduce(
            (acc: Subscription[], current: YouTubeResponse<Subscription>) =>
              acc.concat(current.items || []),
            []
          )
        );
      })
    );
  }

  getChannels(channelIds: string[]): Observable<Channel[]> {
    return this.getAuth().pipe(
      mergeMap((auth) => {
        let channelIdGroups = chunk(channelIds, MAX_SUBSCRIPTIONS);

        let responseObservables: Observable<Channel[]>[] = channelIdGroups.map(
          (group) => {
            return this.youtubeApi.getChannels(group, auth).pipe(
              expand((res) =>
                res.nextPageToken
                  ? this.youtubeApi.getChannels(group, auth, res.nextPageToken)
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
      })
    );
  }

  getUploadedVideos(playlistIds: string[]): Observable<PlaylistItem[]> {
    return this.getAuth().pipe(
      mergeMap((auth) => {
        let playlistObservables: Observable<PlaylistItem[]>[] = playlistIds.map(
          (playlistId) => {
            return this.youtubeApi
              .getPlaylistItems(playlistId, auth)
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
      })
    );
  }

  getVideoInfo(videoIds: string[]): Observable<VideoInfo[]> {
    return this.getAuth().pipe(
      mergeMap((auth) => {
        let videoIdGroups = chunk(videoIds, MAX_SUBSCRIPTIONS);

        let responseObservables: Observable<VideoInfo[]>[] = videoIdGroups.map(
          (group) => {
            return this.youtubeApi.getVideoInfo(group, auth).pipe(
              expand((res) =>
                res.nextPageToken
                  ? this.youtubeApi.getVideoInfo(group, auth, res.nextPageToken)
                  : EMPTY
              ),
              reduce(
                (acc: VideoInfo[], current: YouTubeResponse<VideoInfo>) =>
                  acc.concat(current.items || []),
                []
              )
            );
          }
        );

        return forkJoin(responseObservables).pipe(
          reduce(
            (acc: any[], current: any[][]) => acc.concat(...(current || [])),
            []
          )
        );
      })
    );
  }

  createPlaylist(
    title: string,
    items: PlaylistItemResourceId[]
  ): Observable<any> {
    return this.getAuth().pipe(
      mergeMap((auth) => {
        return this.youtubeApi.createPlaylist(title, auth).pipe(
          switchMap((response) => {
            let playlistId = response.id;

            return from(items).pipe(
              mergeMap(
                (item) =>
                  this.youtubeApi.addToPlaylist(playlistId!, item, auth),
                1
              )
            );
          })
        );
      })
    );
  }

  private getAuth(): Observable<string> {
    this.firebaseAuth.currentUser.then(currentUser => console.log(currentUser));
    return this.firebaseAuth.credential.pipe(mergeMap(cred => {
      console.log(cred);
      return (cred?.credential as OAuthCredential).accessToken!;
    }));
  }
}
