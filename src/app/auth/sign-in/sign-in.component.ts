import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SignInResponse } from '../../model/sign-in';
import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { WebsocketService } from '../../websocket';
import { WS } from '../../websocket.events';

@Component({
    selector: 'chat-sign-in',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private wsService: WebsocketService,
        private router: Router,
        private userService: UserService,
        private messageService: MessageService,
    ) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    ngOnDestroy(): void {
    }

    public join(): void {
        if (!this.form.valid) {
            return;
        }

        const join$ = this.wsService.on(WS.ON.JOINED);
        join$.subscribe(
            (response: SignInResponse) => {
                this.userService.initUser(response);
                this.messageService.addLogMessage(`${response.email} joined.`);
                this.router.navigate(['/chat']);
            }
        );

        const request = {
            email: this.form.value.email
        };

        this.wsService.send(WS.SEND.JOIN, request);
    }

    private createForm(): void {
        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
        });
    }
}
