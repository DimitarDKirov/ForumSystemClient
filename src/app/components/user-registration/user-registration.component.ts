import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'forum-system-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  username: string;
  password: string;
  email: string;
  error: string[];

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
      .registerUser(this.username, this.password, this.email)
      .subscribe(() => this.onRegistation(this), err => this.error = err);
  }

  private onRegistation(instancce: UserRegistrationComponent) {
    instancce.error = null;
    instancce.router.navigate(['/user/login']);
  }
}
