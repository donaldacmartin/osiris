import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorScreenComponent } from './error-screen/error-screen.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { LoadSubscriptionsScreenComponent } from './load-subscriptons-screen/load-subscriptions-screen.component';
import { VideoSelectorScreenComponent } from './video-selector-screen/video-selector-screen.component';
import { SortScreenComponent } from './sort-screen/sort-screen.component';
import { DoneScreenComponent } from './done-screen/done-screen.component';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'error', component: ErrorScreenComponent },
  { path: 'load', component: LoadSubscriptionsScreenComponent },
  { path: 'select', component: VideoSelectorScreenComponent },
  { path: 'sort', component: SortScreenComponent },
  { path: 'done', component: DoneScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
