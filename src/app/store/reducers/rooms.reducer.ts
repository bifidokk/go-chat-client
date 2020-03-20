import { Room } from '../../model/room';
import * as roomAction from '../actions/rooms.actions';

export interface State {
    rooms: Room[];
    current: string;
}

export const initialState: State = {
    rooms: [],
    current: null,
};

export function reducer(state = initialState, action: roomAction.Action) {
    switch (action.type) {
        case roomAction.ADD: {
            return {
                ...state,
                rooms: [ ...state.rooms, action.payload]
            };
        }
        case roomAction.REMOVE: {
            const chatRoom: Room = action.payload;

            return {
                ...state,
                rooms: state.rooms.filter((room: Room) => chatRoom.name !== room.name),
            };
        }
        case roomAction.ADDLIST: {
            const roomList: Room[] = action.payload;

            return {
                ...state,
                rooms: [ ...state.rooms, ...roomList]
            };
        }
        case roomAction.JOIN: {
            const name = action.payload;

            return {
                ...state,
                current: name
            };
        }
        default:
            return state;
    }
}

export const getRooms = (state: State) => state.rooms;
export const getCurrentRoom = (state: State) => state.current;
