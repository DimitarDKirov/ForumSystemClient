import { Component, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';
import { ThreadsService } from '../../services/threads.service';

@Component({
  selector: 'forum-system-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit {
  threads: Thread[];

  constructor(private threadsService: ThreadsService) { }

  ngOnInit() {
    this.threadsService
      .listThreads()
      .subscribe(received => this.threads = received);
  }
}
