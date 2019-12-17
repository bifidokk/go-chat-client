import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WebsocketService } from '../../websocket';
import {WS} from '../../websocket.events';
import {IMessage} from '../../app.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private wsService: WebsocketService,
        private router: Router,
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

        const join$ = this.wsService.on<IMessage[]>(WS.ON.JOINED);
        join$.subscribe(
            () => console.log
        );

        const email = this.form.value.email;
        this.wsService.send(WS.SEND.JOIN, email);
    }

    private createForm(): void {
        this.form = this.fb.group({
            email: [null, [Validators.required, Validators.email]],
        });
    }
}
