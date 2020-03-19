import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Message } from '../../model/message';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'chat-messages',
    templateUrl: 'chat-messages.component.html',
    styleUrls: ['chat-messages.component.scss'],
})
export class ChatMessagesComponent implements OnInit {
    public messages: Observable<Message[]>;

    private ngUnsubscribe = new Subject();

    constructor(
        private messageService: MessageService,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.initMessages();

        this.userService.userJoined
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(() => {
                this.removeMessages();
            });
    }

    public sendMessage(event: any): void {
        const user = this.userService.getUser();
        this.messageService.sendUserMessage(user, event.message);
    }

    private initMessages(): void {
        this.messages = this.messageService.getMessages();
    }

    private removeMessages(): void {
        this.messageService.removeMessages();
    }
}
