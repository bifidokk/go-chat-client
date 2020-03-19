import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { JoinResponse } from '../model/sign-in';
import { ChatUser, User } from '../model/user';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';

@Injectable()
export class UserService {
    public userJoined = new Subject<ChatUser>();

    private user: User;

    public constructor(
        private wsService: WebsocketService,
    ) {
        const joined$ = this.wsService.on(WS.ON.JOINED);

        joined$.subscribe(
            (user: ChatUser) => {
                if (this.user && user.email !== this.user.email) {
                    return;
                }

                this.userJoined.next(user);
            }
        );
    }

    public initUser(data: JoinResponse): User {
        this.user = new User(data.email, data.room);

        return this.user;
    }

    public getUser(): User {
        return this.user;
    }
}
