import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogData } from '../shared/models/user.models';
import { UserService } from '../shared/services/user.service';
import { PasswordResetComponent } from '../password-reset/password-reset.component';
import { ForgotPassword } from '../shared/models/passwords.models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-forgot',
  templateUrl: './password-forgot.component.html',
  styleUrls: ['./password-forgot.component.css']
})
export class PasswordForgotComponent implements OnInit{
  emailValue!: ForgotPassword;
  passForm!: FormGroup;
  isFormValid: boolean = false;
  gotError: boolean = false;
  otpMessage: string = '';
  isLoading: boolean = false;
  otpExists: boolean = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PasswordForgotComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  GetOTP(){
    this.isLoading = true;
    setTimeout(() => {
      this.passForm.markAllAsTouched();
      if (this.passForm.valid) {
      this.isFormValid = true;
      this.emailValue = this.passForm.value;
      this.userService.ForgotPassword(this.emailValue).subscribe(
        (res)=>{
          if(res.isSuccess && res.statusCode == 200){
            this.isFormValid = false;
            this.gotError = false;
            this.otpMessage = res.response;

            this.dialogRef.close();
            this.isLoading = false;
            this.toastr.success(res.response, 'Success!',{
              timeOut: 1500,
            });
            const dialogRef = this.dialog.open(PasswordResetComponent,
            {
              data: { email: this.email.value  }
            }
            );
            dialogRef.afterClosed().subscribe(result => {
            });

          }else if(res.isSuccess && res.statusCode == 202) {
            
            this.otpExists = true;
            this.gotError = false;
            this.otpMessage = res.message;
            this.isLoading = false;

          }
          else if(!res.isSuccess){
            this.otpExists = false;
            this.gotError = true;
            this.otpMessage = res.message;
            this.passForm.reset();
            this.isLoading = false
          }
        }
      )
      }
    }, 1000);
    
  }

  resetError() {
    this.isFormValid = false;
    this.gotError = false;
  }

  resetPassword(){
    const dialogRef = this.dialog.open(PasswordResetComponent,
      {
        data: { email: this.email.value  }
      }
    );
  }

  resendOtpMail() {
    this.emailValue = this.passForm.value;
    this.userService.ResendOtp(this.emailValue).subscribe(
      (res)=> {
        if(res.isSuccess){
          this.toastr.success(res.message, 'Success!',{
            timeOut: 1500,
          });
        }else{
          this.toastr.error(res.message, 'Failure!',{
            timeOut: 1500,
          });
        }
      }
    )
  }

  get email(): FormControl {
    return this.passForm.get("email") as FormControl;
  }
}
