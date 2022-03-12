import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { ErrorScreenComponent } from './error-screen/error-screen.component';
import { TitleBarComponent } from './title-bar/title-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoadSubscriptionsScreenComponent } from './load-subscriptons-screen/load-subscriptions-screen.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadScreenComponent } from './load-screen/load-screen.component';
import { VideoSelectorScreenComponent } from './video-selector-screen/video-selector-screen.component';
import { VideoProfileViewComponent } from './video-selector-screen/video-profile-view/video-profile-view.component';
import { SortScreenComponent } from './sort-screen/sort-screen.component';
import { DoneScreenComponent } from './done-screen/done-screen.component';

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
    LoadScreenComponent,
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
