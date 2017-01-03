import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ThreadsService } from '../../services/threads.service';
import {PostsService} from '../../services/posts.service';
import { Thread } from '../../models/thread';

@Component({
  selector: 'forum-system-thread-details',
  templateUrl: './thread-details.component.html',
  styleUrls: ['./thread-details.component.css']
})
export class ThreadDetailsComponent implements OnInit {
  thread: Thread;
  private route: ActivatedRoute;
  private router: Router;
  private threadsService: ThreadsService;
  private postsService:PostsService;

  constructor(route: ActivatedRoute, router: Router, threadsService: ThreadsService, postsService:PostsService) {
    this.route = route;
    this.router = router;
    this.threadsService = threadsService;
    this.postsService=postsService;
  }

  ngOnInit() {
    let threadId = + this.route.snapshot.params['id'];
    this.threadsService
      .getThreadById(threadId)
      .subscribe(thread => this.thread = thread, console.log);

this.postsService
.getPostsByThreadId(threadId);


  }

}
