import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { Message, MessageService } from '../../services/message.service';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'chat-message',
    templateUrl: 'chat-message.component.html',
    styleUrls: ['chat-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent implements OnInit {
    public messages: Message[];

    constructor(
        private messageService: MessageService,
        private cdRef: ChangeDetectorRef,
        private userService: UserService,
    ) {
    }

    ngOnInit(): void {
        this.initMessages();

        this.messageService.messageSubject.subscribe(() => {
            this.cdRef.markForCheck();
        });
    }

    public sendMessage(event: any): void {
        const user = this.userService.getUser();
        this.messageService.sendUserMessage(user, event.message);
    }

    private initMessages(): void {
        this.messages = this.messageService.getMessages();
        this.cdRef.markForCheck();
    }
}
