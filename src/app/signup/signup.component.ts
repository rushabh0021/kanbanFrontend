import { Component, OnInit } from '@angular/core';
import { LoginsignupService } from '../loginsignup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email = "";
  password = "";
  message = "";
  constructor(private signupService: LoginsignupService) { }

  ngOnInit(): void {
  }

  callSignUpAPI(event) {
    debugger;
    let email = event.target.email.value;
    let password = event.target.password.value;
    this.signupService.signUp({ email, password }).subscribe((res: any) => {
      console.log(res);
      if (res.action == "created") { 
       this.message = "Account successfully created, please login!";
      }else {
        this.message = "something went wrong";
        event.target.email.value = "";
        event.target.password.value = "";
      }
    });
  }
}
