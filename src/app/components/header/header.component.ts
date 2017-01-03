import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'forum-system-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;

  constructor(private userService: UserService, private router:Router) {
    this.userService.userStatus.subscribe(user => { console.log(user); this.username = user; });
  }

  ngOnInit() { }

  logout(){
    this.userService.logoutUser();
    this.router.navigate(['']);
  }



}
