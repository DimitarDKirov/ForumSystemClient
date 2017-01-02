import { Component, OnInit } from '@angular/core';
import { Thread } from '../../models/thread';
import { ThreadsService } from '../../services/threads.service';

@Component({
  selector: 'forum-system-thread-add',
  templateUrl: './thread-add.component.html',
  styleUrls: ['./thread-add.component.css']
})
export class ThreadAddComponent implements OnInit {
  title: string = 'hello';
  content: string = 'consne';

  constructor(private threadsService: ThreadsService) { }

  ngOnInit() {
  }

  onSubmit() {
    const thread = new Thread(this.title, this.content);
    this.threadsService.createThread(thread)
      .subscribe(console.log, console.log);
  }
}
