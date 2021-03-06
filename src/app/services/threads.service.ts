import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user-service.service';
import { Thread } from '../models/thread';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ThreadsService {
  private http: Http;
  private userService: UserService;
  private threadUrl: string = '/api/threads';

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  createThread(thread: Thread): Observable<string[]> {
    let data = {
      "title": thread.Title,
      "content": thread.Content
    };
    let url = Constants.server + this.threadUrl;

    return this.userService
      .authPost(url, data)
      .map(this.extractResult)
      .catch(this.processError);
  }

  listThreads(): Observable<Thread[]> {
    return this.http
      .get(Constants.server + this.threadUrl)
      .map(this.extractThreads);
  }

  getThreadById(id: number): Observable<any> {
    const url = Constants.server + this.threadUrl + '/' + id;
    return this.http
      .get(url)
      .map(this.extractResult)
      .catch(this.processThreadDetailsError);
  }

  private extractResult(res: Response): Thread {
    const result = res.json();
    let thread = new Thread(result.Title, result.Content);
    thread.Creator = result.Creator;
    thread.Id = result.Id;
    thread.DateCreated = result.DateCreated;
    return thread;
  }

  private processError(err: Response | any): Observable<string[]> {
    const titleError = err.json().ModelState['requestThread.Title'][0];
    const contentError = err.json().ModelState['requestThread.Content'][0];
    return Observable.throw([titleError, contentError]);
  }

  private extractThreads(res: Response): Thread[] {
    let threads = res.json().map(result => {
      let thread = new Thread(result.Title, result.Content);
      thread.Creator = result.Creator;
      thread.Id = result.Id;
      thread.DateCreated = result.DateCreated;
      return thread;
    });

    return threads;
  }

  private processThreadDetailsError(err: Response | any): Observable<string> {
    return Observable.throw(err.json()['Message']);
  }
}
