import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'personalkanban';

  routes = [
    {path : "/boards", title: "My Boards" },
    {path : "/about", title: "about" }, 
  ];
}
