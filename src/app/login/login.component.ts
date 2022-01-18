import { Component, OnInit } from '@angular/core';
import { LoginsignupService } from '../loginsignup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private signupService: LoginsignupService,
    private router: Router) { }
  message;
  ngOnInit(): void {
  }
  callSignInAPI(event) {
    debugger;
    let email = event.target.email.value;
    let password = event.target.password.value;
    this.signupService.login({ email, password }).subscribe((res: any) => {
      console.log(res);
      if (res.token && res.token !== "") {
        this.signupService.setAuthToken(res.token);
        this.router.navigate(['/boards']);
      } else {
        console.warn("login failed");
        
      }
      //login success
      //Redirect to boards page
    });
  }

}
