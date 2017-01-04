import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http, Response } from '@angular/http';
import { Post } from '../models/post';
import { UserService } from './user-service.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostsService {
  private http: Http;
  private userService: UserService;
  private postsUtl = '/api/posts';

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  getPostsByThreadId(threadId: number): Observable<Post[]> {
    const url = Constants.server + this.postsUtl + '?threadId=' + threadId;
    return this.http
      .get(url)
      .map(this.parsePosts)
  }

  addPost(post: Post, threadId: number): Observable<string[]> {
    const url = Constants.server + this.postsUtl + '?threadId=' + threadId;
    let data = {
      content: post.Content
    };
    return this.userService
      .authPost(url, data)
      .catch(this.processError);
  }

  private parsePosts(res: Response | any): Post[] {
    return res.json().map(input => {
      let post = new Post();
      post.Content = input.Content;
      post.Id = input.Id;
      post.NickName = input.NickName;
      post.PostDate = input.PostDate;
      return post;
    });
  }

  private processError(res: Response | any): Observable<string[]> {
    return Observable.throw(res.json()['Message']);
  }
}
