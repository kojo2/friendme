import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat/chat.component';
import {UsersService} from './users.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    SearchComponent,
    ResultsComponent,
    UserProfileComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
    	{ 
    		path:'',
    		component: LoginPageComponent 
    	},
    	{ 
    		path:'dashboard',
    		component: DashboardComponent 
    	},
    	{ 
    		path:'search',
    		component: SearchComponent 
    	},
    	{
    		path:'results',
    		component: ResultsComponent
    	},
    	{
    		path:'profile/:username/:friend',
    		component: UserProfileComponent
    	},
    	{
    		path:'chat/:username',
    		component: ChatComponent
    	}
    ])
  ],
  providers: [UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
