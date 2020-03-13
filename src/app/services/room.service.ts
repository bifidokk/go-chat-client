import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as roomAction from '../store/actions/rooms.actions';
import * as fromRoot from '../store/reducers';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';

export interface Room {
    name: string;
}

export interface AddRoom {
    name: string;
}

export interface RoomList {
    rooms: Room[];
}

@Injectable()
export class RoomService {
    public constructor(
        private wsService: WebsocketService,
        private store: Store<fromRoot.State>,
    ) {
        const room$ = this.wsService.on(WS.ON.ROOM_ADDED);

        room$.subscribe(
            (response: Room) => {
                this.store.dispatch(new roomAction.Add(response));
            }
        );
    }

    public initRooms(): void {
        this.wsService.send(WS.SEND.ROOMS);

        const rooms$ = this.wsService.on(WS.ON.ROOMS);

        rooms$.subscribe(
            (response: RoomList) => {
                this.store.dispatch(new roomAction.AddList(response.rooms));
            }
        );
    }

    public getRooms(): Observable<Room[]> {
        return this.store.select(fromRoot.getRooms);
    }

    public addRoom(request: AddRoom): void {
        this.wsService.send(WS.SEND.ADD_ROOM, request);
    }
}
