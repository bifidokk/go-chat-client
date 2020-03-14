export interface Message {
    email: string;
    type: Type;
    msg: string;
    date: Date;
}

export interface SentMessage {
    type: Type;
    msg: string;
}

export enum Type {
    TEXT = 'text'
}
