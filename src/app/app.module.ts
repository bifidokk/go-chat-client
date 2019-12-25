import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {AppRoutingModule, ROUTED_COMPONENTS} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebsocketModule } from './websocket';
import {NbThemeModule, NbLayoutModule, NbInputModule, NbButtonModule, NbCardModule, NbChatModule} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormErrorComponent} from './shared/components/form-error/form-error.component';
import {UserService} from './services/user.service';
import {ChatMessageComponent} from './chat/chat-message/chat-message.component';

const COMPONENTS = [
    FormErrorComponent,
    ChatMessageComponent,
];

@NgModule({
    declarations: [
        ROUTED_COMPONENTS,
        AppComponent,
        COMPONENTS,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        WebsocketModule.config({
            url: 'ws:localhost:8080/ws'
        }),
        NbThemeModule.forRoot({ name: 'dark' }),
        NbLayoutModule,
        NbEvaIconsModule,
        NbInputModule,
        NbButtonModule,
        NbCardModule,
        FormsModule,
        ReactiveFormsModule,
        NbChatModule,
    ],
    exports: [
        COMPONENTS,
    ],
    providers: [
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
