import { Action } from '@ngrx/store';

import { Message } from '../../services/message.service';

export const ADD = '[Messages] Add';


export class Add implements Action {
    readonly type = ADD;
    constructor(public payload: Message) { }
}

export type Action = Add;
