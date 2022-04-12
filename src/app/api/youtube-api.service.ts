import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subscription } from '../model/youtube/subscription';
import { Channel } from '../model/youtube/channel';
import { YouTubeResponse } from '../model/youtube/generic-response';
import {
  PlaylistItem,
  PlaylistItemResourceId,
} from '../model/youtube/playlist-item';
import { YouTubePlaylistCreateResponse } from '../model/youtube/playlist-create-response';
import { VideoInfo } from '../model/youtube/video-info';
import { Category } from '../model/youtube/category';

const BASE_URL = 'https://content-youtube.googleapis.com/youtube/v3';

const SUBSCRIPTIONS_URL = BASE_URL + '/subscriptions';
const CHANNELS_URL = BASE_URL + '/channels';
const PLAYLISTS_URL = BASE_URL + '/playlists';
const PLAYLIST_ITEMS_URL = BASE_URL + '/playlistItems';
const CATEGORIES_URL = BASE_URL + '/videoCategories';
const VIDEOS_URL = BASE_URL + '/videos';

const SUBSCRIPTION_PARAMS = new HttpParams()
  .set('part', 'snippet')
  .set('mine', true)
  .set('maxResults', 50)
  .set('order', 'unread');

const CHANNEL_PARAMS = new HttpParams()
  .set('part', 'contentDetails')
  .set('maxResults', 50);

const PLAYLIST_PARAMS = new HttpParams()
  .set('part', 'snippet')
  .set('maxResults', 50);

const VIDEO_PARAMS = new HttpParams()
  .set('part', 'contentDetails,snippet')
  .set('maxResults', 50);

const CATEGORIES_PARAMS = new HttpParams()
  .set('part', 'snippet')
  .set('regionCode', 'CA');

@Injectable({
  providedIn: 'root',
})
export class YoutubeApiService {
  constructor(private httpClient: HttpClient) {}

  getSubscriptions(
    token: string,
    pageToken?: string
  ): Observable<YouTubeResponse<Subscription>> {
    let params = pageToken
      ? SUBSCRIPTION_PARAMS.set('pageToken', pageToken)
      : SUBSCRIPTION_PARAMS;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<YouTubeResponse<Subscription>>(
      SUBSCRIPTIONS_URL,
      { headers: headers, params: params }
    );
  }

  getChannels(
    channelIds: string[],
    token: string,
    pageToken?: string
  ): Observable<YouTubeResponse<Channel>> {
    let channelIdsStr = channelIds.join(',');
    let paramsWithChannels = CHANNEL_PARAMS.set('id', channelIdsStr);
    let params = pageToken
      ? paramsWithChannels.set('pageToken', pageToken)
      : paramsWithChannels;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<YouTubeResponse<Channel>>(CHANNELS_URL, {
      headers: headers,
      params: params,
    });
  }

  getPlaylistItems(
    playlistId: string,
    token: string
  ): Observable<YouTubeResponse<PlaylistItem>> {
    let params = PLAYLIST_PARAMS.set('playlistId', playlistId);
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<YouTubeResponse<PlaylistItem>>(
      PLAYLIST_ITEMS_URL,
      { headers: headers, params: params }
    );
  }

  getVideoInfo(
    videoIds: string[],
    token: string,
    pageToken?: string
  ): Observable<YouTubeResponse<VideoInfo>> {
    let videosIdsStr = videoIds.join(',');
    let paramsWithVideos = VIDEO_PARAMS.set('id', videosIdsStr);
    let params = pageToken
      ? paramsWithVideos.set('pageToken', pageToken)
      : paramsWithVideos;
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.get<YouTubeResponse<VideoInfo>>(VIDEOS_URL, {
      headers: headers,
      params: params,
    });
  }

  getCategories(
    token: string,
    pageToken?: string
  ): Observable<YouTubeResponse<Category>> {
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    let params = pageToken
      ? CATEGORIES_PARAMS.set('pageToken', pageToken)
      : CATEGORIES_PARAMS;

    return this.httpClient.get<YouTubeResponse<Category>>(CATEGORIES_URL, {
      headers: headers,
      params: params,
    });
  }

  createPlaylist(
    title: string,
    token: string
  ): Observable<YouTubePlaylistCreateResponse> {
    let params = new HttpParams().set('part', 'snippet');
    let body = { snippet: { title: title } };
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post<YouTubePlaylistCreateResponse>(
      PLAYLISTS_URL,
      body,
      { headers: headers, params: params }
    );
  }

  addToPlaylist(
    playlistId: string,
    resourceId: PlaylistItemResourceId,
    token: string
  ): Observable<any> {
    let params = new HttpParams().set('part', 'snippet');
    let body = { snippet: { playlistId: playlistId, resourceId: resourceId } };
    let headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.httpClient.post(PLAYLIST_ITEMS_URL, body, {
      headers: headers,
      params: params,
    });
  }
}
