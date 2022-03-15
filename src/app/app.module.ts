import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './screens/splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoadSubscriptionsScreenComponent } from './screens/load-screen/load-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { VideoSelectorScreenComponent } from './screens/video-selector-screen/video-selector-screen.component';
import { VideoProfileViewComponent } from './screens/video-selector-screen/video-profile-view/video-profile-view.component';
import { SortScreenComponent } from './screens/sort-screen/sort-screen.component';
import { DoneScreenComponent } from './screens/done-screen/done-screen.component';
import { AuthGuardService } from './guards/auth.guard.service';
import { AuthService } from './service/auth.service';
import { LoadedVideosGuardService } from './guards/loaded.videos.guard.service';
import { VideoStorageService } from './service/video.storage.service';

const googleKey =
  '381100539388-gheh626i6nmai4m4hgi6m7urbpf2l9a6.apps.googleusercontent.com';

const googleScopes = {
  scope: 'https://www.googleapis.com/auth/youtube',
};

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
    VideoSelectorScreenComponent,
    VideoProfileViewComponent,
    SortScreenComponent,
    DoneScreenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    HttpClientModule,
    ...materialModules,
  ],
  exports: [...materialModules],
  providers: [
    AuthGuardService,
    AuthService,
    LoadedVideosGuardService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(googleKey, googleScopes),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    VideoStorageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
