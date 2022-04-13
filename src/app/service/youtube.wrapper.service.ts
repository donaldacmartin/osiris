import { Injectable } from '@angular/core';
import { map, mergeMap, Observable, of } from 'rxjs';
import { orderedPlaylistItems } from '../functions/compare';
import { applyTimeConstraint } from '../functions/filter';
import {
  PlaylistItem,
  PlaylistItemThumbnail,
} from '../model/youtube/playlist-item';
import { Video } from '../model/video';
import { VideoInfo } from '../model/youtube/video-info';
import { YoutubeService } from './youtube.service';
import { parseDuration } from '../functions/transform';
import { franc } from 'franc';

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

  public getVideos(channelIds: string[]): Observable<Video[]> {
    return this.youtubeService.getCategories().pipe(
      mergeMap((categories) => {
        return this.getUploadPlaylistIds(channelIds).pipe(
          mergeMap((playlists) => {
            return this.getPlaylistVideos(playlists).pipe(
              mergeMap((videos) => {
                let videoIds = videos.map(
                  (v) => v.snippet?.resourceId?.videoId!
                );

                return this.getVideoInfo(videoIds).pipe(
                  map((videoInfos) => {
                    let videoInfoMap = videoInfos.reduce((map, videoInfo) => {
                      map.set(videoInfo.id!, videoInfo);
                      return map;
                    }, new Map<string, VideoInfo>());

                    return videos.map((v) => {
                      let videoInfo = videoInfoMap.get(
                        v.snippet?.resourceId?.videoId!
                      );

                      return {
                        id: v.snippet?.resourceId?.videoId,
                        title: v.snippet?.title,
                        description: videoInfo?.snippet?.description,
                        channel: v.snippet?.channelTitle,
                        tags: videoInfo?.snippet?.tags,
                        category: categories.get(
                          videoInfo?.snippet?.categoryId!
                        ),
                        language: franc(videoInfo?.snippet?.description!),
                        thumbnail: this.getThumnail(v),
                        ageAtSelection: this.getAge(videoInfo!),
                        duration: parseDuration(
                          videoInfo?.contentDetails?.duration!
                        ),
                        placeInList: -1,
                      } as Video;
                    });
                  })
                );
              })
            );
          })
        );
      })
    );
  }

  private getUploadPlaylistIds(channelIds: string[]): Observable<string[]> {
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

  private getPlaylistVideos(playlistIds: string[]): Observable<PlaylistItem[]> {
    return this.youtubeService
      .getUploadedVideos(playlistIds)
      .pipe(
        map((videos) =>
          videos.filter(applyTimeConstraint).sort(orderedPlaylistItems)
        )
      );
  }

  private getVideoInfo(videoIds: string[]): Observable<VideoInfo[]> {
    return this.youtubeService.getVideoInfo(videoIds);
  }

  private getThumnail(playlistItem: PlaylistItem): string {
    let thumbnails =
      new Map(Object.entries(playlistItem.snippet?.thumbnails!)) ||
      new Map<string, PlaylistItemThumbnail>();
    let standardThumbnail =
      thumbnails.get('high') || new PlaylistItemThumbnail();
    return standardThumbnail?.url || '';
  }

  private getAge(videoInfo: VideoInfo): number {
    return new Date().getTime() - new Date(videoInfo?.snippet?.publishedAt!).getTime();
  }

}
