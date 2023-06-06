import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ForgotPassword, ResetPassword } from '../shared/models/passwords.models';
import { UserService } from '../shared/services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit{
  resetPassForm!: FormGroup;
  resetRequest!: ResetPassword;
  isLoading: boolean = false;
  public showPassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: ForgotPassword,
    public dialogRef: MatDialogRef<PasswordResetComponent>,
  ) {}

  ngOnInit(): void {
    this.resetPassForm = this.fb.group({
      email: new FormControl(this.data.email),
      otp: new FormControl('',[Validators.required,Validators.pattern("[0-9]*.{6,6}")]),
      newPassword: new FormControl('', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
        ]),
      confirmPassword: new FormControl('', [Validators.required]),
    }, { validators: this.checkPasswords });
  }



  submitResetForm() {
    this.isLoading = true;
    setTimeout(() => {
      this.resetPassForm.markAllAsTouched();
      if (this.resetPassForm.valid) {
        this.resetRequest = this.resetPassForm.value;

        //console.log(this.resetRequest);
        this.userService.ResetPassword(this.resetRequest).subscribe(
          (res) => {
            if(res.isSuccess){
              this.dialogRef.close();
              this.toastr.success(res.message, 'Success!',{
                timeOut: 2000,
              });
            }else{
              this.resetPassForm.reset();
              this.isLoading = false;
              this.toastr.error(res.message, 'Failure!',{
                timeOut: 2000,
             });
            }
          }
        )
      };
    }, 1000);
  }

  //Function to toggle password visibility in password fields
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  //Validator Function to check password match in password and confirm-password fields
  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('newPassword')?.value
    let confirmPass = control.get('confirmPassword')?.value
    return pass == confirmPass ? null : { notSame: true }
  }


 
  get otp(): FormControl {
    return this.resetPassForm.get("otp") as FormControl;
  }
  get newPassword(): FormControl {
    return this.resetPassForm.get("newPassword") as FormControl;
  }
  get confirmPassword(): FormControl {
    return this.resetPassForm.get("confirmPassword") as FormControl;
  }
}
