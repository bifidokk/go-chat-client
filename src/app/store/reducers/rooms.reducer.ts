import { Room } from '../../model/room';
import * as roomAction from '../actions/rooms.actions';

export interface State {
    rooms: Room[];
}

export const initialState: State = {
    rooms: [],
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
        default:
            return state;
    }
}

export const getRooms = (state: State) => state.rooms;
