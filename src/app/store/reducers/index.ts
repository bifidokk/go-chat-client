import { ActionReducer, ActionReducerMap, createFeatureSelector, createSelector, MetaReducer } from '@ngrx/store';

import * as activeUsers from './active-users.reducer';
import * as messages from './messages.reducer';
import * as rooms from './rooms.reducer';

export interface State {
    users: activeUsers.State;
    messages: messages.State;
    rooms: rooms.State;
}

export const reducers: ActionReducerMap<State> = {
    users: activeUsers.reducer,
    messages: messages.reducer,
    rooms: rooms.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = [logger];

export const getUsersState =
    createFeatureSelector<activeUsers.State>('users');

export const getUsers = createSelector(
    getUsersState,
    activeUsers.getUsers,
);

export const getMessagesState =
    createFeatureSelector<messages.State>('messages');

export const getMessages = createSelector(
    getMessagesState,
    messages.getMessages,
);

export const getRoomsState =
    createFeatureSelector<rooms.State>('rooms');

export const getRooms = createSelector(
    getRoomsState,
    rooms.getRooms,
);
