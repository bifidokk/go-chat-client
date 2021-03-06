import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { Room } from '../../model/room';
import { RoomService } from '../../services/room.service';

@Component({
    selector: 'chat-rooms',
    templateUrl: 'chat-rooms.component.html',
    styleUrls: ['chat-rooms.component.scss'],
})
export class ChatRoomsComponent implements OnInit {
    public rooms: Observable<Room[]>;
    public currentRoom: Observable<string>;
    public form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private roomService: RoomService,
    ) {
    }

    ngOnInit(): void {
        this.createForm();
        this.initRooms();
    }

    private initRooms(): void {
        this.roomService.initRooms();
        this.rooms = this.roomService.getRooms().pipe();
        this.currentRoom = this.roomService.getCurrentRoom().pipe();
    }

    private createForm(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required]],
        });
    }

    public addRoom(): void {
        if (!this.form.valid) {
            return;
        }

        const request = {
            name: this.form.value.name,
        };

        this.roomService.addRoom(request);
        this.form.reset({
            name: '',
        });
    }

    public joinRoom(name: string): void {
        const request = {
            name: name,
        };

        this.roomService.joinRoom(request);
    }
}
