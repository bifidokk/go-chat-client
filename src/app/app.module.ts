import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
    NbButtonModule,
    NbCardModule,
    NbChatModule,
    NbInputModule,
    NbLayoutModule,
    NbListModule,
    NbThemeModule,
    NbUserModule,
} from '@nebular/theme';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule, ROUTED_COMPONENTS } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatMessagesComponent } from './chat/chat-message/chat-messages.component';
import { ChatRoomsComponent } from './chat/chat-rooms/chat-rooms.component';
import { ChatUsersComponent } from './chat/chat-users/chat-users.component';
import { ActiveUsersService } from './services/active-users.service';
import { ChatConfig } from './services/chat.service';
import { MessageService } from './services/message.service';
import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';
import { FormErrorComponent } from './shared/components/form-error/form-error.component';
import { metaReducers, reducers } from './store/reducers';
import { WebsocketModule } from './websocket';

const COMPONENTS = [
    FormErrorComponent,
    ChatMessagesComponent,
    ChatUsersComponent,
    ChatRoomsComponent,
];

@NgModule({
    declarations: [
        ROUTED_COMPONENTS,
        AppComponent,
        COMPONENTS,
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot(reducers, { metaReducers }),
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
        NbListModule,
        NbUserModule,
    ],
    exports: [
        COMPONENTS,
    ],
    providers: [
        ActiveUsersService,
        MessageService,
        UserService,
        ChatConfig,
        RoomService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
