export class User {
    public constructor(
        public id: string,
        public email: string,
        public room: string,
    ) {
    }
}

export interface ChatUser {
    id: string;
    email: string;
    room: string;
    date: Date;
}

export interface UserList {
    users: ChatUser[];
}
