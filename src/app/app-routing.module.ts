import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInComponent } from './auth/sign-in/sign-in.component';
import { ChatLayoutComponent } from './chat/layout/chat-layout.component';
import { UserInitGuard } from './guards/user-init.guard';

const routes: Routes = [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', component: SignInComponent, data: {title: 'Sign in'}, },
      { path: 'chat', canActivate: [UserInitGuard], component: ChatLayoutComponent, data: {title: 'Chat'}},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [
        UserInitGuard,
    ]
})
export class AppRoutingModule { }

export const ROUTED_COMPONENTS = [
    SignInComponent,
    ChatLayoutComponent,
];
