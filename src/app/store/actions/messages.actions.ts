import { Action } from '@ngrx/store';

import { Message } from '../../model/message';

export const ADD = '[Messages] Add';

export class Add implements Action {
    readonly type = ADD;
    constructor(public payload: Message) { }
}

export type Action = Add;
