import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoStorageService } from 'src/app/service/video.storage.service';
import { PlaylistItem } from '../../model/playlist-item';

@Component({
  selector: 'app-video-selector-screen',
  templateUrl: './select-screen.component.html',
  styleUrls: ['./select-screen.component.css'],
})
export class SelectScreenComponent implements OnInit {
  message = "Let's choose some videos";
  currentVideo?: PlaylistItem = undefined;
  allVideos?: PlaylistItem[] = [];
  initialCount: number = 0;

  selectedVideos: PlaylistItem[] = [];

  constructor(
    private router: Router,
    private videoStorageService: VideoStorageService
  ) {}

  ngOnInit(): void {
    this.allVideos = this.videoStorageService.getLoadedVideos();
    this.initialCount = this.allVideos?.length!;
    this.currentVideo = this.allVideos?.pop();
  }

  progress(): number {
    return (
      ((this.initialCount - this.allVideos?.length!) / this.initialCount) * 100
    );
  }

  accept(): void {
    this.selectedVideos.push(this.currentVideo!);
    this.next();
  }

  reject(): void {
    this.next();
  }

  private next(): void {
    if (this.allVideos?.length! > 0) {
      this.currentVideo = this.allVideos?.pop();
    } else {
      if (this.selectedVideos.length > 0) {
        this.videoStorageService.storeUnsortedVideos(this.selectedVideos);
        this.router.navigate(['/sort']);
      } else {
        this.router.navigate(['/done']);
      }
    }
  }
}
