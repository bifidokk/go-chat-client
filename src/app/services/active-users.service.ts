import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userAction from '../store/actions/active-users.actions';
import * as fromRoot from '../store/reducers';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';


export interface ChatUser {
    email: string;
    date: Date;
}

export interface UserList {
    users: ChatUser[];
}

@Injectable()
export class ActiveUsersService {
    public constructor(
        private wsService: WebsocketService,
        private store: Store<fromRoot.State>,
    ) {
        const joined$ = this.wsService.on(WS.ON.JOINED);

        joined$.subscribe(
            (user: ChatUser) => {
                this.store.dispatch(new userAction.Join(user));
            }
        );

        const left$ = this.wsService.on(WS.ON.LEFT);

        left$.subscribe(
            (user: ChatUser) => {
                this.store.dispatch(new userAction.Leave(user));
            }
        );
    }

    public initUsers(): void {
        this.wsService.send(WS.SEND.USERS);

        const users$ = this.wsService.on(WS.ON.USERS);

        users$.subscribe(
            (response: UserList) => {
                this.store.dispatch(new userAction.AddList(response.users));
            }
        );
    }

    public getUsers(): Observable<ChatUser[]> {
        return this.store.select(fromRoot.getUsers);
    }
}
