import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
interface taskData {
  taskName: string,
  description: string,
  priority: string,
  dueDate: string
}
@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.css']
})
export class AddTaskModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddTaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: taskData) { }

  ngOnInit(): void {
  }

  onSubmitClick(): void {
    this.dialogRef.close()
  }
}
