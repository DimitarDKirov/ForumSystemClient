import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { UserService } from '../../services/user-service.service';
import { NotificationService } from '../../services/notification.service';
import { Post } from '../../models/post';

@Component({
  selector: 'forum-system-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  @Input() threadId: any;
  newPost: string;
  posts: Post[];
  username: string;
  private postsService: PostsService;
  private userService: UserService;
  private notificationService: NotificationService;

  constructor(postsService: PostsService, userService: UserService, notificationService: NotificationService) {
    this.postsService = postsService;
    this.userService = userService;
    this.notificationService = notificationService;
  }

  ngOnInit() {
    this.username = this.userService.getUsername();
    this.postsService
      .getPostsByThreadId(this.threadId)
      .subscribe(posts => this.posts = posts, console.log);
  }

  onSubmit() {
    let post = new Post();
    post.Content = this.newPost;
    post.PostDate = new Date();
    post.NickName = this.username;

    this.postsService
      .addPost(post, this.threadId)
      .subscribe(() => {
        this.posts.push(post);
        this.notificationService.success('Post added successfully');
      },
      err => this.notificationService.error(err));
  }

}
