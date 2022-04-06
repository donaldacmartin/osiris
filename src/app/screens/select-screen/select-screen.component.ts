import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/model/video';
import { VideoStorageService } from 'src/app/service/video.storage.service';

@Component({
  selector: 'app-video-selector-screen',
  templateUrl: './select-screen.component.html',
  styleUrls: ['./select-screen.component.css'],
})
export class SelectScreenComponent implements OnInit {
  message = "Let's choose some videos";
  currentVideo?: Video = undefined;
  initialCount: number = 0;

  loadedVideos: Video[] = [];
  acceptedVideos: Video[] = [];
  rejectedVideos: Video[] = [];

  constructor(
    private router: Router,
    private videoStorageService: VideoStorageService
  ) {}

  ngOnInit(): void {
    this.loadedVideos = this.videoStorageService.getLoadedVideos();
    this.initialCount = this.loadedVideos?.length!;
    this.currentVideo = this.loadedVideos?.pop();
  }

  progress(): number {
    return (
      ((this.initialCount - this.loadedVideos?.length!) / this.initialCount) *
      100
    );
  }

  accept(): void {
    this.acceptedVideos.push(this.currentVideo!);
    this.next();
  }

  reject(): void {
    this.rejectedVideos.push(this.currentVideo!);
    this.next();
  }

  private next(): void {
    if (this.loadedVideos?.length! > 0) {
      this.currentVideo = this.loadedVideos?.pop();
    } else {
      this.videoStorageService.storeAcceptedVideos(this.acceptedVideos);
      this.videoStorageService.storeRejectedVideos(this.rejectedVideos);

      if (this.acceptedVideos.length > 0) {
        this.router.navigate(['/sort']);
      } else {
        this.router.navigate(['/done']);
      }
    }
  }
}
