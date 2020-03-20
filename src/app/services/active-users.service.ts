import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Message, Type } from '../model/message';
import { ChatUser, User, UserList } from '../model/user';
import * as userAction from '../store/actions/active-users.actions';
import * as messageAction from '../store/actions/messages.actions';
import * as fromRoot from '../store/reducers';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';

import { ChatConfig } from './chat.service';
import { UserService } from './user.service';

type UserChatAction = 'joined' | 'left';

@Injectable()
export class ActiveUsersService {
    private currentUser: User;

    public constructor(
        private wsService: WebsocketService,
        private store: Store<fromRoot.State>,
        private config: ChatConfig,
        private userService: UserService,
    ) {
        this.currentUser = this.userService.getUser();

        const joined$ = this.wsService.on(WS.ON.JOINED);

        joined$.subscribe(
            (user: ChatUser) => {
                if (this.userService.isCurrentUser(user.id)) {
                    return;
                }

                this.store.dispatch(new userAction.Join(user));

                const message = this.getActionMessage(user, 'joined');
                this.store.dispatch(new messageAction.Add(message));
            }
        );

        const left$ = this.wsService.on(WS.ON.LEFT);

        left$.subscribe(
            (user: ChatUser) => {
                this.store.dispatch(new userAction.Leave(user));

                const message = this.getActionMessage(user, 'left');
                this.store.dispatch(new messageAction.Add(message));
            }
        );

        const users$ = this.wsService.on(WS.ON.USERS);

        users$.subscribe(
            (response: UserList) => {
                this.store.dispatch(new userAction.AddList(response.users));
            }
        );
    }

    public initUsers(): void {
        this.wsService.send(WS.SEND.USERS);
    }

    public getUsers(): Observable<ChatUser[]> {
        return this.store.select(fromRoot.getUsers);
    }

    private getActionMessage(user: ChatUser, action: UserChatAction): Message {
        return {
            email: this.config.adminName,
            type: Type.TEXT,
            msg: `${user.email} ${action} room!`,
            date: new Date(),
        };
    }
}
