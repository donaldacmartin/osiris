import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorScreenComponent } from './screens/error-screen/error-screen.component';
import { SplashScreenComponent } from './screens/splash-screen/splash-screen.component';
import { LoadSubscriptionsScreenComponent } from './screens/load-screen/load-screen.component';
import { SelectScreenComponent } from './screens/select-screen/select-screen.component';
import { SortScreenComponent } from './screens/sort-screen/sort-screen.component';
import { DoneScreenComponent } from './screens/done-screen/done-screen.component';
import { AuthGuardService } from './guards/auth.guard.service';
import { LoadedVideosGuardService } from './guards/loaded.videos.guard.service';
import { UnsortedVideosGuardService } from './guards/unsorted.videos.guard.service';

const routes: Routes = [
  { path: '', component: SplashScreenComponent },
  { path: 'error', component: ErrorScreenComponent },
  {
    path: 'load',
    component: LoadSubscriptionsScreenComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'select',
    component: SelectScreenComponent,
    canActivate: [AuthGuardService, LoadedVideosGuardService],
  },
  {
    path: 'sort',
    component: SortScreenComponent,
    canActivate: [AuthGuardService, UnsortedVideosGuardService],
  },
  {
    path: 'done',
    component: DoneScreenComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
