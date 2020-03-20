import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';

import { JoinResponse } from '../model/sign-in';
import { ChatUser, User } from '../model/user';
import * as roomAction from '../store/actions/rooms.actions';
import * as fromRoot from '../store/reducers';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';

@Injectable()
export class UserService {
    public userJoined = new Subject<ChatUser>();

    private user: User;

    public constructor(
        private wsService: WebsocketService,
        private store: Store<fromRoot.State>,
    ) {
        const joined$ = this.wsService.on(WS.ON.JOINED);

        joined$.subscribe(
            (user: ChatUser) => {
                if (!this.isCurrentUser(user.id)) {
                    return;
                }

                this.store.dispatch(new roomAction.Join(user.room));
                this.userJoined.next(user);
            }
        );
    }

    public initUser(data: JoinResponse): User {
        this.user = new User(data.id, data.email, data.room);
        this.store.dispatch(new roomAction.Join(this.user.room));

        return this.user;
    }

    public getUser(): User {
        return this.user;
    }

    public isCurrentUser(id: string): boolean {
        return this.user && id === this.user.id;
    }
}
