import { Component, OnInit } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {
    
  }

  SubmitAddForm(){}

  openLoginDialog(){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(UserLoginComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
