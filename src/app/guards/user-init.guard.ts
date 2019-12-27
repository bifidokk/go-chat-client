import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserService } from '../services/user.service';

@Injectable()
export class UserInitGuard implements CanActivate {

    public constructor(
        private userService: UserService,
        private router: Router,
    ) {
    }

    public canActivate(): boolean {
        if (this.userService.getUser() == null) {
            this.router.navigate(['/sign-in']);
            return false;
        }

        return true;
    }
}
