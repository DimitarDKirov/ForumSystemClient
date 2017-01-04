import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'forum-system-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  username: string;
  password: string;
  email: string;

  private userService: UserService;
  private router: Router;
  private notificationService: NotificationService;

  constructor(userService: UserService, router: Router, notification: NotificationService) {
    this.userService = userService;
    this.router = router;
    this.notificationService = notification;
  }

  ngOnInit() { }

  onSubmit() {
    this.userService
      .loginUser(this.email, this.password)
      .subscribe(() => this.onLogin(this), err => this.notificationService.error(err));
  }

  private onLogin(instance: UserLoginComponent) {
    instance.notificationService.success("Login successfull");
    instance.router.navigate(['thread/list']);
  }

}
