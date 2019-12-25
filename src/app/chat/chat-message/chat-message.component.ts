import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-chat-message',
    templateUrl: 'chat-message.component.html',
    styleUrls: ['chat-message.component.scss'],
})
export class ChatMessageComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }
}
