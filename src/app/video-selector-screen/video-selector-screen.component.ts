import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistItem } from '../model/playlist-item';

@Component({
  selector: 'app-video-selector-screen',
  templateUrl: './video-selector-screen.component.html',
  styleUrls: ['./video-selector-screen.component.css'],
})
export class VideoSelectorScreenComponent implements OnInit {
  message = "Let's choose some videos";
  currentVideo?: PlaylistItem = undefined;
  allVideos?: PlaylistItem[] = [];
  initialCount: number = 0;

  selectedVideos: PlaylistItem[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.allVideos = JSON.parse(localStorage.getItem('videos')!);
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
      localStorage.setItem(
        'unsortedVideos',
        JSON.stringify(this.selectedVideos)
      );
      this.router.navigate(['/sort']);
    }
  }
}
