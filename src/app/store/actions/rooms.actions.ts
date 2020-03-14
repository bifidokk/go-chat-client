import { Action } from '@ngrx/store';

import { Room } from '../../model/room';

export const ADD = '[Rooms] Add';
export const REMOVE = '[Rooms] Remove';
export const ADDLIST = '[Rooms] AddList';


export class Add implements Action {
    readonly type = ADD;
    constructor(public payload: Room) { }
}

export class Remove implements Action {
    readonly type = REMOVE;
    constructor(public payload: Room) { }
}

export class AddList implements Action {
    readonly type = ADDLIST;
    constructor(public payload: Room[]) { }
}

export type Action = Add | Remove | AddList;
