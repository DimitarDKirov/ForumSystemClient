import { Component, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';
import { ThreadsService } from '../../services/threads.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'forum-system-thread-add',
  templateUrl: './thread-add.component.html',
  styleUrls: ['./thread-add.component.css']
})

export class ThreadAddComponent implements OnInit {
  title: string;
  content: string;
  private threadsService: ThreadsService;
  private notificationService: NotificationService;
  private router: Router;

  constructor(threadsService: ThreadsService, notification: NotificationService, router: Router) {
    this.threadsService = threadsService;
    this.notificationService = notification;
    this.router = router;
  }

  ngOnInit() {
  }

  onSubmit() {
    const thread = new Thread(this.title, this.content);
    this.threadsService.createThread(thread)
      .subscribe(() => {
        this.notificationService.success('Thread added', true);
        this.router.navigate(['/thread/list']);
      },
      err => this.notificationService.error(err));
  }
}
