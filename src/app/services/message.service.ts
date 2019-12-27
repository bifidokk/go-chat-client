import { Injectable } from '@angular/core';

export interface Message {
    user: string;
    type: Type;
    msg: string;
    date: Date;
}

export enum Type {
    TEXT = 'text'
}

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    public constructor() {
    }

    public addUserMessage(): void {

    }

    public addLogMessage(msg: string): void {
        const message: Message = {
            user: 'Admin',
            type: Type.TEXT,
            msg: msg,
            date: new Date(),
        };

        this.messages.push(message);
    }

    public getMessages(): Message[] {
        return this.messages;
    }
}
