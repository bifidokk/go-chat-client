import { Action } from '@ngrx/store';

import { Message } from '../../model/message';

export const ADD = '[Messages] Add';
export const CLEAR = '[Messages] Clear';

export class Add implements Action {
    readonly type = ADD;
    constructor(public payload: Message) { }
}

export class Clear implements Action {
    readonly type = CLEAR;
    constructor() { }
}

export type Action = Add | Clear;
