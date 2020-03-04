import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { User } from '../model/user';
import * as messageAction from '../store/actions/messages.actions';
import * as fromRoot from '../store/reducers';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';

export interface Message {
    email: string;
    type: Type;
    msg: string;
    date: Date;
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
    public constructor(
        private wsService: WebsocketService,
        private store: Store<fromRoot.State>,
    ) {
        const messages$ = this.wsService.on(WS.ON.MESSAGE);

        messages$.subscribe(
            (message: Message) => {
                this.store.dispatch(new messageAction.Add(message));
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

    public getMessages(): Observable<Message[]> {
        return this.store.select(fromRoot.getMessages);
    }
}
