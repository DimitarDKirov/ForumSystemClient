import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subject } from '../../../node_modules/rxjs/Rx';

@Injectable()
export class UserService {
  private http: Http;
  private registerUrl: string = '/api/account/register';
  private loginUrl: string = '/token';
  private userLogging = new Subject<string>();
  userStatus = this.userLogging.asObservable();

  constructor(http: Http) {
    this.http = http;
  }

  registerUser(username: string, password: string, email: string): Observable<any> {
    const data = {
      'email': email,
      'password': password,
      'ConfirmPassword': password,
      'nickname': username
    };

    return this.http
      .post(Constants.server + this.registerUrl, data)
      .catch(this.processRegisterError);
  }

  loginUser(email: string, password: string): Observable<string> {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers });

    const data = `grant_type=password&username=${email}&password=${password}`;

    const dataUri = encodeURI(data);
    return this.http
      .post(Constants.server + this.loginUrl, dataUri, options)
      .map(res => this.storeUserDetails(res, this))
      .catch(this.processError);
  }

  getUsername(): string {
    return localStorage.getItem('username') || null;
  }

  logoutUser() {
    localStorage.clear();
    this.userLogging.next(null);
  }

  authPost(url: string, data: any): Observable<Response> {
    const token = localStorage.getItem('token')
    let headers = new Headers({ 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, data, options);
  }

  private storeUserDetails(res: Response, instance: UserService): string {
    const token = res.json().access_token;
    const username = res.json().userName;
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    instance.userLogging.next(username);
    return username;
  }

  private processError(err: Response | any): Observable<string> {
    const errorText = err.json().error_description;
    return Observable.throw(errorText);
  }

  private processRegisterError(err: Response | any): Observable<string[]> {
    const errorMessages = err.json()['ModelState'][''][0];
    return Observable.throw(errorMessages);
  }
}
