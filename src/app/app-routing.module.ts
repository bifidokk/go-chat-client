import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
  { path: '', component: SignInComponent, data: {title: 'Sign in'}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const ROUTED_COMPONENTS = [
  SignInComponent,
];
