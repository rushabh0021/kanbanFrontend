import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardAndTaskService } from '../board-and-task.service';
import { AddBoardModalComponent } from '../modals/add-board-modal/add-board-modal.component';
import { AddTaskModalComponent } from '../modals/add-task-modal/add-task-modal.component';
interface taskData {
  taskName: string,
  description: string,
  priority: string,
  dueDate: string
}
@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {
  taskData: taskData = {
    taskName: "task name",
    description: "description",
    dueDate: "",
    priority: ""
  }
  boardId;
  constructor(public dialog: MatDialog, public router: Router,
    private route: ActivatedRoute,
    public boardTaskService: BoardAndTaskService) {
    this.route.params.subscribe(params => {
      console.log(params);
      this.boardId = params.boardId;
      this.populateArray(this.boardId);
    });
  }
  /* todo = [
    {
      "title": "task_todo1",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-high"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-mid"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-mid"
    },
  ];
  done = [
    {
      "title": "task_done1",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
  ];
  test = [
    {
      "title": "task_done1",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
    {
      "title": "task",
      "description": "this is descrption",
      "priority": "task-normal"
    },
  ]; */

  taskpool = [];
  done = [];
  inprogress = [];

  kanbanArray = {
    taskpool: this.taskpool,
    done: this.done,
    inprogress: this.inprogress
  }

  ngOnInit(): void {
  }


  populateArray(boardId) {
    let taskData = this.boardTaskService.getTaskData();
    taskData.filter((kanban) => {
      /* if (boardId === kanban.board){
        switch (kanban.status){
          case "taskpool":
            this.taskpool.push(kanban);
            break;
          case "done":
            this.done.push(kanban);
            break;
          case "inprogress":
            this.inprogress.push(kanban);
            break;  
        }
      } */
      if (boardId === kanban.board) {
        this.kanbanArray[kanban.status].push(kanban);
      }
    });
  }

  openAddTaskModal() {
    const dialogRef = this.dialog.open(AddTaskModalComponent, {
      width: '500px',
      data: this.taskData,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      //this.taskData = result;
      this.callCreateTaskApi(result);
    });

  }
  callCreateTaskApi(taskData) {
    let taskDataWithBoardId = { ...taskData, board: this.boardId, status: "taskpool" };
    this.boardTaskService.createTask(taskDataWithBoardId).subscribe((res: any) => {
      console.log(res);
      this.kanbanArray[res.data.status].push(res.data);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      (event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
