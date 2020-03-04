import { Message } from '../../services/message.service';
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
            const message: Message = action.payload;

            return {
                ...state,
                messages: [ ...state.messages, message]
            };
        }
        default:
            return state;
    }
}

export const getMessages = (state: State) => state.messages;
