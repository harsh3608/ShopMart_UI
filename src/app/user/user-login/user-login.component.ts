import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { UserLogin } from '../shared/models/user.models';
import { UserService } from '../shared/services/user.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  userLogin!: UserLogin;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private userService: UserService,
  ) {
    this.userLogin = new UserLogin();
  }

  ngOnInit(): void {
  }

  SubmitloginForm(){
    // this.addUserForm.markAllAsTouched();
    // if (this.addUserForm.valid) {
    this.userService.loginUser(this.userLogin).subscribe(
      (res)=>{
        if(res.isSuccess){
          window.alert('success');
        }
      }
    )
    //}

  }


  OpenRegisterDialog(){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(AddUserComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      //this.getExamsList();
    });
  }



}
