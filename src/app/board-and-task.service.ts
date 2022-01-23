import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginsignupService } from './loginsignup.service';

const url = "http://localhost:3000/api/";
@Injectable({
  providedIn: 'root'
})
export class BoardAndTaskService {

  getBoardsPath = "board";
  signInPath = "signin";
  createTaskPath = "task";
  getAllTasks = "task";
  private tasks = [];
  constructor(private http: HttpClient, private loginService: LoginsignupService) { }

  getBoards() {
    return this.http.get(`${this.getUrl()}${this.getBoardsPath}`, { headers: this.getHeaderWithAuthToken() });
  }
  createBoard(boardData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getAuthToken()}`
    })
    return this.http.post(`${this.getUrl()}${this.getBoardsPath}`, boardData, { headers: headers })
  }

  createTask(taskData) {
    //create task
    let headers = this.getHeaderWithAuthToken();

    return this.http.post(`${this.getUrl()}${this.createTaskPath}`, taskData, { "headers": headers });
  }

  getTasks() {
    //get all tasks of board
    let headers = this.getHeaderWithAuthToken();
    this.http.get(`${this.getUrl()}${this.getAllTasks}`, { headers: headers }).subscribe((taskArray: any) => {
      if (taskArray.data) {
        this.setTaskData(taskArray.data);
      }
    });
  }

  getBoardsFromStorage() {
    return localStorage.getItem("boards") ? localStorage.getItem("boards") : "";
  }

  getTasksFromStorage() {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : "";
  }
  setTaskData(tasks) {
    this.tasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  getTaskData() {
    return this.tasks ? this.tasks : this.getTasksFromStorage();
  }
  getUrl() {
    return url;
  }
  getHeaderWithAuthToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getAuthToken()}`
    })
  }
}

