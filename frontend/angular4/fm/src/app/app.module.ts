import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './search/search.component';
import { ResultsComponent } from './results/results.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ChatComponent } from './chat/chat.component';
import { UsersService } from './users.service';
import { ConversationService } from './conversation.service';
import { RegisterComponent } from './register/register.component';
import { HttpService } from './http.service';
import { HangmanGameComponent } from './hangman-game/hangman-game.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DashboardComponent,
    SearchComponent,
    ResultsComponent,
    UserProfileComponent,
    ChatComponent,
    RegisterComponent,
    HangmanGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
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
            path:'results/:loc/:dist',
            component: ResultsComponent
        },
        {
            path:'profile/:_id/:username/:friend',
            component: UserProfileComponent
        },
        {
            path:'chat/:username/:id',
            component: ChatComponent
        },
        {
            path:'hangman/:username',
            component: HangmanGameComponent
        },
        {
            path:'register',
            component: RegisterComponent
        }
    ])
  ],
  providers: [UsersService,HttpService, ConversationService],
  bootstrap: [AppComponent]
})
export class AppModule { }