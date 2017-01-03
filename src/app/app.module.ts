import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { RouterModule, Routes } from '@angular/router';
import { UserService } from './services/user-service.service';
import { ThreadsService } from './services/threads.service';
import { PostsService } from './services/posts.service';
import { UserLoginComponent } from './components/user-login/user-login.component';
import { ThreadAddComponent } from './components/thread-add/thread-add.component';
import { ThreadListComponent } from './components/thread-list/thread-list.component';
import { ThreadDetailsComponent } from './components/thread-details/thread-details.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

const appRoutes: Routes = [
  { path: 'user/registration', component: UserRegistrationComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'thread/add', component: ThreadAddComponent },
  { path: 'thread/list', component: ThreadListComponent },
  { path: 'thread/details/:id', component: ThreadDetailsComponent }
  /*{ path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    UserRegistrationComponent,
    UserLoginComponent,
    ThreadAddComponent,
    ThreadListComponent,
    ThreadDetailsComponent,
    PostsListComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    ThreadsService,
    PostsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
