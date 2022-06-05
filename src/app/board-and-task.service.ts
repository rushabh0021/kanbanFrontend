import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginsignupService } from './loginsignup.service';

const url = "https://cryptic-falls-65041.herokuapp.com/api/";
@Injectable({
  providedIn: 'root'
})
export class BoardAndTaskService {

  getBoardsPath = "board";
  signInPath = "signin";
  createTaskPath = "task";
  getAllTasks = "task";
  updateTask = "task";
  private tasks = [];
  constructor(private http: HttpClient, private loginService: LoginsignupService) { }

  getBoards() {
    return this.http.get(`${this.getUrl()}${this.getBoardsPath}`, { headers: this.getHeaderWithAuthToken() });
  }
  deleteBoard(boardData){
    let headers = this.getHeaderWithAuthToken();
    return this.http.delete(`${this.getUrl()}${this.getBoardsPath}/${boardData._id}`, { "headers": headers });
  }

  createBoard(boardData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getAuthToken()}`
    })
    return this.http.post(`${this.getUrl()}${this.getBoardsPath}`, boardData, { headers: headers })
  }

  createTask(taskData) {
    let headers = this.getHeaderWithAuthToken();
    return this.http.post(`${this.getUrl()}${this.createTaskPath}`, taskData, { "headers": headers });
  }

  getTasks() {
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
    let tasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
    return tasks;
  }

  setTaskData(tasks) {
    this.tasks = tasks;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  getTaskData() {
    let tasks = this.tasks && this.tasks.length > 1 ? this.tasks : this.getTasksFromStorage();
    return tasks;
  }

  getUrl() {
    return url;
  }

  updateTaskApi(taskData) {
    let headers = this.getHeaderWithAuthToken();
    return this.http.put(`${this.getUrl()}${this.updateTask}/${taskData._id}`, taskData, { "headers": headers });
  }

  getHeaderWithAuthToken() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loginService.getAuthToken()}`
    })
  }
}

