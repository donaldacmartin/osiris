import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { VideoStorageService } from '../service/video.storage.service';

@Injectable()
export class UnsortedVideosGuardService implements CanActivate {
  constructor(
    private videoStorageService: VideoStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.videoStorageService.getAcceptedVideos().length > 0) {
      return true;
    } else {
      this.router.navigate(['/load']);
      return false;
    }
  }
}
