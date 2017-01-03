import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router'
import { UserService } from './user-service.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  private router: Router;
  private userService: UserService;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  canActivate() {
    const isLoggedIn = !!this.userService.getUsername();
    if (!isLoggedIn) {
      this.router.navigate(['/user/login']);
    }
    return isLoggedIn;
  }
}
