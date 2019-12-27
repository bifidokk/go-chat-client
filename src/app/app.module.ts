import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbButtonModule, NbCardModule, NbChatModule, NbInputModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';

import { AppRoutingModule, ROUTED_COMPONENTS } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMessageComponent } from './chat/chat-message/chat-message.component';
import { MessageService } from './services/message.service';
import { UserService } from './services/user.service';
import { FormErrorComponent } from './shared/components/form-error/form-error.component';
import { WebsocketModule } from './websocket';

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
        MessageService,
        UserService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
