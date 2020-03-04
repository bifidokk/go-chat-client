import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Message, MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'chat-message',
    templateUrl: 'chat-message.component.html',
    styleUrls: ['chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit {
    public messages: Observable<Message[]>;

    constructor(
        private messageService: MessageService,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.initMessages();
    }

    public sendMessage(event: any): void {
        const user = this.userService.getUser();
        this.messageService.sendUserMessage(user, event.message);
    }

    private initMessages(): void {
        this.messages = this.messageService.getMessages();
    }
}
