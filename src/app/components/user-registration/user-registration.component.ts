import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'forum-system-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent implements OnInit {
  username: string;
  password: string;
  email: string;

  private userService: UserService;
  private notificationService: NotificationService;
  private router: Router;

  constructor(userService: UserService, router: Router, notification: NotificationService) {
    this.userService = userService;
    this.router = router;
    this.notificationService = notification;
  }

  ngOnInit() { }

  onSubmit() {
    this.userService
      .registerUser(this.username, this.password, this.email)
      .subscribe(() => this.onRegistation(this), err => this.notificationService.error(err));
  }

  private onRegistation(instancce: UserRegistrationComponent) {
    instancce.notificationService.success('You are registered, please login', true);
    instancce.router.navigate(['/user/login']);
  }
}
