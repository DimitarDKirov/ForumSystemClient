import { Component, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ThreadsService } from '../../services/threads.service';

@Component({
  selector: 'forum-system-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: Thread[];
  private router: Router;
  private threadsService: ThreadsService;

  constructor(threadsService: ThreadsService, router: Router) {
    this.threadsService = threadsService;
    this.router = router;
  }

  ngOnInit() {
    this.threadsService
      .listThreads()
      .subscribe(received => this.threads = received);
  }

  viewDetails(thread: Thread) {
    this.router.navigate(['/thread/details', thread.Id]);
  }
}
