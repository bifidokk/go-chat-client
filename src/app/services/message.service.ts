import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

import { User } from '../model/user';
import { WebsocketService } from '../websocket';
import {WS} from '../websocket.events';

export interface Message {
    type: Type;
    msg: string;
    time: Date;
    user: string;
}

export interface SentMessage {
    type: Type;
    msg: string;
}

export enum Type {
    TEXT = 'text'
}

@Injectable()
export class MessageService {
    public messageSubject = new Subject();

    private messages: Message[] = [];

    public constructor(
        private wsService: WebsocketService,
    ) {
        const messages$ = this.wsService.on(WS.ON.MESSAGE);

        messages$.subscribe(
            ( message: Message) => {
                this.messages.push(message);
                this.messageSubject.next();
            }
        );
    }

    public sendUserMessage(user: User, msg: string): void {
        const message: SentMessage = {
            type: Type.TEXT,
            msg: msg,
        };

        this.wsService.send(WS.SEND.SEND_MSG, message);
    }

    public getMessages(): Message[] {
        return this.messages;
    }
}
