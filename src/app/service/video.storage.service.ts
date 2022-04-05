import { Injectable } from '@angular/core';
import { Video } from '../model/video';

@Injectable({
  providedIn: 'root',
})
export class VideoStorageService {
  private loadedVideos: Video[] = [];
  private acceptedVideos: Video[] = [];
  private rejectedVideos: Video[] = [];

  storeLoadedVideos(videos: Video[]): void {
    this.loadedVideos = [];
    this.loadedVideos.push(...videos);
  }

  getLoadedVideos(): Video[] {
    let loadedVideos = [];
    loadedVideos.push(...this.loadedVideos);
    return loadedVideos;
  }

  storeAcceptedVideos(videos: Video[]): void {
    this.acceptedVideos = [];
    this.acceptedVideos.push(...videos);
  }

  getAcceptedVideos(): Video[] {
    let acceptedVideos = [];
    acceptedVideos.push(...this.acceptedVideos);
    return acceptedVideos;
  }

  storeRejectedVideos(videos: Video[]): void {
    this.rejectedVideos = [];
    this.rejectedVideos.push(...videos);
  }

  getRejectedVideos(): Video[] {
    let rejectedVideos = [];
    rejectedVideos.push(...this.rejectedVideos);
    return rejectedVideos;
  }
}
