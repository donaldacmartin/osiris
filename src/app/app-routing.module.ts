import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ErrorScreenComponent } from './error-screen/error-screen.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

const routes: Routes = [
  {path: '', component: SplashScreenComponent},
  {path: 'error', component: ErrorScreenComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
