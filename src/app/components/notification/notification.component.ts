import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'forum-system-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})

export class NotificationComponent implements OnInit {
  message: Message;

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
    this.notifier.getMessage().subscribe((notification: Message) => this.message = notification);
  }

}
