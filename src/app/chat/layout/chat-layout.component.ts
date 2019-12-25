import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-chat',
    templateUrl: 'chat-layout.component.html',
    styleUrls: ['chat-layout.component.scss'],
})
export class ChatLayoutComponent implements OnInit, OnDestroy {
    ngOnDestroy(): void {
    }

    ngOnInit(): void {
    }
}
