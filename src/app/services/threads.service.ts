import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserService } from './user-service.service';
import { Thread } from '../models/thread';
import { Observable, Subject } from '../../../node_modules/rxjs/Rx';

@Injectable()
export class ThreadsService {
  private http: Http;
  private userService: UserService;
  private createThreadUrl: string = '/api/threads';

  constructor(http: Http, userService: UserService) {
    this.http = http;
    this.userService = userService;
  }

  createThread(thread: Thread): Observable<Response> {
    let data = JSON.stringify(thread);
    let url = Constants.server + this.createThreadUrl;
    return this.userService.authPost(url, data);
  }

}
