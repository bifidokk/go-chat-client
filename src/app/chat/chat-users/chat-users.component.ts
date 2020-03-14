import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ChatUser } from '../../model/user';
import { ActiveUsersService } from '../../services/active-users.service';

@Component({
    selector: 'chat-users',
    templateUrl: 'chat-users.component.html',
    styleUrls: ['chat-users.component.scss'],
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
