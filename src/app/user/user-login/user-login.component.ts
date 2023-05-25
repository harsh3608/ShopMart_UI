import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { DialogData, UserLogin } from '../shared/models/user.models';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  userLogin!: UserLogin;
  public showPassword: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.userLogin = new UserLogin();
  }

  ngOnInit(): void {
  }

  SubmitloginForm(){
    this.userService.loginUser(this.userLogin).subscribe(
      (res)=>{
        if(res.isSuccess && res.statusCode == 200){
          if(res.response.userType == 'Customer'){
            this.toastr.success('Logged in Successfully!', 'Success!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
            this.router.navigate(['/home'])
          }
          else if(res.response.userType == 'Seller'){
            this.toastr.success('Seller Logged in Successfully!', 'Success!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
            this.router.navigate(['/seller'])
          }
        } else if(!res.isSuccess){
          this.toastr.error(res.message, 'Success!',{
            timeOut: 2000,
          });
          this.dialogRef.close();
        }
      }
    )

  }

  //Function to toggle password visibility in password fields
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  OpenRegisterDialog(userType: number){
    this.dialogRef.close();
    const dialogRef = this.dialog.open(AddUserComponent,
      {
        data: { userRole: userType }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      //this.getExamsList();
    });
  }

}
