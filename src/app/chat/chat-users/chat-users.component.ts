import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ActiveUsersService, ChatUser } from '../../services/active-users.service';

@Component({
    selector: 'chat-users',
    templateUrl: 'chat-users.component.html',
    styleUrls: ['chat-users.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatUsersComponent implements OnInit {
    public users: Observable<ChatUser[]>;

    constructor(
        private activeUsersService: ActiveUsersService,
    ) {
    }

    ngOnInit(): void {
        this.initUsers();
    }

    private initUsers(): void {
        this.activeUsersService.initUsers();
        this.users = this.activeUsersService.getUsers().pipe();
    }
}
