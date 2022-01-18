import { Component, OnInit } from '@angular/core';
import { BoardAndTaskService } from '../board-and-task.service';
import { MatDialog } from '@angular/material/dialog';
import { AddBoardModalComponent } from '../modals/add-board-modal/add-board-modal.component';
import { LoginsignupService } from '../loginsignup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boards: [];
  tasks: [];
  constructor(private boardService: BoardAndTaskService,
    public dialog: MatDialog,
    private loginService: LoginsignupService,
    public router: Router
    ) { }

  ngOnInit(): void {
    this.getBoardsApiCall();

  }

  getBoardsApiCall() {
    let boards = this.boardService.getBoardsFromStorage()
    if (!boards) {
      this.boardService.getBoards().subscribe((boardsArray: any) => {
        console.log(boardsArray);
        if (boardsArray.data) {
          this.boards = boardsArray.data;
          localStorage.setItem("boards", JSON.stringify(this.boards));
          this.getTaskApiCall();
        }
      })
    } else {
      console.log(this.loginService.getAuthToken());
      this.boards = JSON.parse(boards);
      this.getTaskApiCall();
    }
  }
  getTaskApiCall() {
    let tasks = this.boardService.getTasksFromStorage()
    if (!tasks) {
      this.boardService.getTasks().subscribe((taskArray: any) => {
        console.log(taskArray);
        if (taskArray.data) {
          this.boardService.setTaskData(taskArray.data);
          localStorage.setItem("tasks", JSON.stringify(this.boards));
        }
      });
    } else {
      console.log(this.loginService.getAuthToken());
      this.tasks = tasks;
    }
  }

  openAddBoardModal() {
    const dialogRef = this.dialog.open(AddBoardModalComponent, {
      width: '500px',
      data: { name: "", description: "" },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.boardService.createBoard(result).subscribe((res) => {
        console.log(res);

      });
    });
  }
  showKanban(clickedBoardId) {
    console.log(clickedBoardId);
    this.router.navigate(['kanban', { boardId: clickedBoardId} ]);
  }

}
