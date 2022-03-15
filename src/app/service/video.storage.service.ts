import { Injectable } from '@angular/core';
import { PlaylistItem } from '../model/playlist-item';

@Injectable({
  providedIn: 'root',
})
export class VideoStorageService {
  private unsortedVideos: PlaylistItem[] = [];

  storeLoadedVideos(videos: PlaylistItem[]): void {
    this.unsortedVideos = [];
    this.unsortedVideos.push(...videos);
  }

  getLoadedVideos(): PlaylistItem[] {
    let unsortedVideos = [];
    unsortedVideos.push(...this.unsortedVideos);
    return unsortedVideos;
  }
}
