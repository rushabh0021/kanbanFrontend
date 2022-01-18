import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

const url = "http://localhost:3000/";
@Injectable({
  providedIn: 'root'
})
export class LoginsignupService implements OnDestroy, OnInit {
  signupPath = "signup";
  signInPath = "signin";
  private authToken = "";
  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  ngOnDestroy(): void {
    localStorage.setItem("kanId", this.authToken);
  }
  ngOnInit() {
    const token = localStorage.getItem('kanId');
    if (token) {
      this.authToken = token;
    }
  }

  signUp(credentials) {
    return this.http.post(`${this.getUrl()}${this.signupPath}`, { action: "signup", ...credentials });
  }

  login(credentials) {
    return this.http.post(`${this.getUrl()}${this.signInPath}`, { action: "login", ...credentials });
  }

  getUrl() {
    return url;
  }
  setAuthToken(token) {
    this.authToken = token;
    localStorage.setItem("kanId", token);
  }
  getAuthToken() {
    return this.authToken;
  }
  deleteAuthToken() {
    this.authToken = "";
    localStorage.removeItem("boards");
    localStorage.removeItem("tasks");
    localStorage.removeItem('kanId');
  }

  isAuthenticated(): boolean {
    const token = this.authToken !== "" ? this.authToken : localStorage.getItem('kanId');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
