export class User {
    public constructor(
        public email: string,
    ) {
    }
}

export interface ChatUser {
    email: string;
    date: Date;
}

export interface UserList {
    users: ChatUser[];
}
