import {Injectable} from '@angular/core';
import {SignInResponse} from '../model/sign-in';
import {User} from '../model/user';

@Injectable()
export class UserService {
    private user: User;

    public constructor() {
    }

    public initUser(data: SignInResponse): User {
        this.user = new User(data.email);

        return this.user;
    }

    public getUser(): User {
        return this.user;
    }
}
