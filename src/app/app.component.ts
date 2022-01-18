import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { LoginsignupService } from './loginsignup.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personalkanban';
  _router = this.router;
  constructor(private loginService: LoginsignupService, public router: Router) { }
  routes = [
    { path: "/boards", title: "My Boards" },
    { path: "/about", title: "about" },
  ];
  logout() {
    this.loginService.deleteAuthToken();
    this.router.navigate(['login']);
  }
}
