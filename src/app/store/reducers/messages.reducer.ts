import { Message } from '../../model/message';
import * as messageAction from '../actions/messages.actions';

export interface State {
    messages: Message[];
}

export const initialState: State = {
    messages: [],
};

export function reducer(state = initialState, action: messageAction.Action) {
    switch (action.type) {
        case messageAction.ADD: {
            return {
                ...state,
                messages: [ ...state.messages, action.payload]
            };
        }
        case messageAction.CLEAR: {
            return {
                ...state,
                messages: []
            };
        }
        default:
            return state;
    }
}

export const getMessages = (state: State) => state.messages;
