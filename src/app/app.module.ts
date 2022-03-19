import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './screens/splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoadSubscriptionsScreenComponent } from './screens/load-screen/load-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { SelectScreenComponent } from './screens/select-screen/select-screen.component';
import { VideoProfileViewComponent } from './screens/select-screen/video-profile-view/video-profile-view.component';
import { SortScreenComponent } from './screens/sort-screen/sort-screen.component';
import { DoneScreenComponent } from './screens/done-screen/done-screen.component';
import { AuthGuardService } from './guards/auth.guard.service';
import { AuthService } from './service/auth.service';
import { LoadedVideosGuardService } from './guards/loaded.videos.guard.service';
import { VideoStorageService } from './service/video.storage.service';
import { UnsortedVideosGuardService } from './guards/unsorted.videos.guard.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const materialModules = [
  MatButtonModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatListModule,
  DragDropModule,
];

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    ErrorScreenComponent,
    TitleBarComponent,
    LoadSubscriptionsScreenComponent,
    SelectScreenComponent,
    VideoProfileViewComponent,
    SortScreenComponent,
    DoneScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ...materialModules,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  exports: [...materialModules],
  providers: [
    AuthGuardService,
    AuthService,
    LoadedVideosGuardService,
    UnsortedVideosGuardService,
    VideoStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
