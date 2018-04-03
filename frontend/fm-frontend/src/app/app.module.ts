import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpService } from './http.service';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat/chat.component';
import {UsersService} from './users.service';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    SearchComponent,
    ResultsComponent,
    UserProfileComponent,
    ChatComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
    	},
        {
            path:'register',
            component: RegisterComponent
        }
    ])
  ],
  providers: [UsersService,HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
