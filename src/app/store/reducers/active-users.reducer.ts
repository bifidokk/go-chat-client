import { ChatUser } from '../../services/active-users.service';
import * as userAction from '../actions/active-users.actions';

export interface State {
    users: ChatUser[];
}

export const initialState: State = {
    users: [],
}

export function reducer(state = initialState, action: userAction.Action) {
    switch (action.type) {
        case userAction.JOIN: {
            const user: ChatUser = action.payload;

            return {
                ...state,
                users: [ ...state.users, user]
            };
        }
        case userAction.LEAVE: {
            const chatUser: ChatUser = action.payload;

            return {
                ...state,
                users: state.users.filter((user: ChatUser) => chatUser.email !== user.email),
            };
        }
        case userAction.ADDLIST: {
            const userList: ChatUser[] = action.payload;

            return {
                ...state,
                users: [ ...state.users, ...userList]
            };
        }
        default:
            return state;
    }
}

export const getUsers = (state: State) => state.users;
