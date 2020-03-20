import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AddRoom, JoinRoom, Room, RoomList } from '../model/room';
import * as roomAction from '../store/actions/rooms.actions';
import * as fromRoot from '../store/reducers';
import { WebsocketService } from '../websocket';
import { WS } from '../websocket.events';

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

    public joinRoom(request: JoinRoom): void {
        this.wsService.send(WS.SEND.JOIN_ROOM, request);
    }

    public getCurrentRoom(): Observable<string> {
        return this.store.select(fromRoot.getCurrentRoom);
    }
}
