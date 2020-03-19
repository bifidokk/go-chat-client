import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChatUser } from '../../model/user';
import { ActiveUsersService } from '../../services/active-users.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'chat-users',
    templateUrl: 'chat-users.component.html',
    styleUrls: ['chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit, OnDestroy {
    public users: Observable<ChatUser[]>;

    private ngUnsubscribe = new Subject();

    constructor(
        private activeUsersService: ActiveUsersService,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.initUsers();

        this.userService.userJoined
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.initUsers();
            });
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    private initUsers(): void {
        this.activeUsersService.initUsers();
        this.users = this.activeUsersService.getUsers().pipe();
    }
}
