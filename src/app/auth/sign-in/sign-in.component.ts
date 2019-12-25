import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WebsocketService } from '../../websocket';
import { WS } from '../../websocket.events';
import { Router } from '@angular/router';
import {SignInResponse} from '../../model/sign-in';
import {UserService} from '../../services/user.service';

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
        private userService: UserService,
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
                console.log('123')
                this.userService.initUser(response);
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
