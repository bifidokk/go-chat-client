import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

import { Message, MessageService } from '../../services/message.service';

@Component({
    selector: 'chat-message',
    templateUrl: 'chat-message.component.html',
    styleUrls: ['chat-message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent implements OnInit, OnDestroy {
    public messages: Message[];

    constructor(
        private messageService: MessageService,
        private cdRef: ChangeDetectorRef,
    ) {
    }
    ngOnInit(): void {
        this.initMessages();
    }

    ngOnDestroy(): void {
    }

    private initMessages(): void {
        this.messages = this.messageService.getMessages();
        this.cdRef.markForCheck();
    }
}
