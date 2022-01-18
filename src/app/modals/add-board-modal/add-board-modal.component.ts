import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
interface boardInfo{
  name: string,
  description: string
}
@Component({
  selector: 'app-add-board-modal',
  templateUrl: './add-board-modal.component.html',
  styleUrls: ['./add-board-modal.component.css']
})
export class AddBoardModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddBoardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: boardInfo) { }

  ngOnInit(): void {
  }
  onSubmitClick(): void {
    this.dialogRef.close() 
  }
}
