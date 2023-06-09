import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddUserComponent } from '../user-add/user-add.component';
import { DialogData, UserLogin } from '../shared/models/user.models';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/authorization/auth.service';
import { PasswordForgotComponent } from '../password-forgot/password-forgot.component';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  userLogin!: UserLogin;
  public showPassword: boolean = false;
  loginForm!: FormGroup;
  isLoading: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
    this.userLogin = new UserLogin();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(this.userLogin.email),
      password: new FormControl(this.userLogin.password)
    })
  }

  SubmitloginForm(){
    this.isLoading = true;
    setTimeout(() => {
      this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.userService.loginUser(this.userLogin).subscribe(
        (res)=>{
          if(res.isSuccess && res.statusCode == 200){
            if(res.response.userType == 'Customer'){
              this.authService.setToken(res.response.token);
              //
              this.toastr.success('Logged in Successfully!', 'Success!',{
                timeOut: 2000,
              });
              this.dialogRef.close();
              this.router.navigate(['/shop-home'])
            }
            else if(res.response.userType == 'Seller'){
              this.authService.setToken(res.response.token);
              this.toastr.success('Seller Logged in Successfully!', 'Success!',{
                timeOut: 2000,
              });
              this.dialogRef.close();
              this.router.navigate(['/seller']);
              this.authService.getUserMail();
              this.authService.getUserRole();
            }
          } else if(!res.isSuccess){
            this.toastr.error(res.message, 'Failure!',{
              timeOut: 2000,
            });
            this.dialogRef.close();
          }
        }
      );
    }
    }, 1500);
    
  }

  OpenForgotPasswordDialog() {
    this.dialogRef.close();
    const dialogRef = this.dialog.open(PasswordForgotComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
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

    });
  }

}
