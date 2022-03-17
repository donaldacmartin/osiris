import { Injectable } from '@angular/core';
import { PlaylistItem } from '../model/playlist-item';

@Injectable({
  providedIn: 'root',
})
export class VideoStorageService {
  private loadedVideos: PlaylistItem[] = [];
  private unsortedVideos: PlaylistItem[] = [];

  storeLoadedVideos(videos: PlaylistItem[]): void {
    this.loadedVideos = [];
    this.loadedVideos.push(...videos);
  }

  getLoadedVideos(): PlaylistItem[] {
    let loadedVideos = [];
    loadedVideos.push(...this.loadedVideos);
    return loadedVideos;
  }

  storeUnsortedVideos(videos: PlaylistItem[]): void {
    this.unsortedVideos = [];
    this.unsortedVideos.push(...videos);
  }

  getUnsortedVideos(): PlaylistItem[] {
    let unsortedVideos = [];
    unsortedVideos.push(...this.unsortedVideos);
    return unsortedVideos;
  }
}
