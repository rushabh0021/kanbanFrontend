import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BoardComponent } from './board/board.component';
import { KanbanComponent } from './kanban/kanban.component';
import { AboutComponent } from './about/about.component';
import { AddTaskModalComponent } from './modals/add-task-modal/add-task-modal.component';
import { AddBoardModalComponent } from './modals/add-board-modal/add-board-modal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptopServiceService } from './token-interceptop-service.service';
import { JwtModule } from "@auth0/angular-jwt";

export function tokenGetter() {
  return localStorage.getItem("kanId");
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    BoardComponent,
    KanbanComponent,
    AboutComponent,
    AddTaskModalComponent,
    AddBoardModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["mypersonalkanban.com", "localhost:4200"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptopServiceService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
