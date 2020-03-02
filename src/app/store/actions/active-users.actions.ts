import { Action } from '@ngrx/store';

import { ChatUser } from '../../services/active-users.service';

export const JOIN = '[Active Users] Join';
export const LEAVE = '[Active Users] Leave';
export const ADDLIST = '[Active Users] AddList';


export class Join implements Action {
    readonly type = JOIN;
    constructor(public payload: ChatUser) { }
}

export class Leave implements Action {
    readonly type = LEAVE;
    constructor(public payload: ChatUser) { }
}

export class AddList implements Action {
    readonly type = ADDLIST;
    constructor(public payload: ChatUser[]) { }
}

export type Action = Join | Leave | AddList;
