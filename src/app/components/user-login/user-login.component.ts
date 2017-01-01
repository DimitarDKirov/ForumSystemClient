import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'forum-system-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  error: string;

  private userService: UserService;
  private router: Router;

  constructor(userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
  }

  ngOnInit() { }

  onSubmit() {
    this.error = null;
    this.userService
      .loginUser(this.email, this.password)
      .subscribe(() => this.onLogin(this), err => this.error = err);
  }

  private onLogin(instance: UserLoginComponent) {
    instance.error = null;
    instance.router.navigate(['/']);
  }

}
