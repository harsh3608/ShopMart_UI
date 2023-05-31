import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ChangePassword } from '../shared/models/passwords.models';
import { AuthService } from '../shared/authorization/auth.service';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent implements OnInit {
  changePassForm!: FormGroup;
  public showPassword: boolean = false;
  public showCurrentPassword: boolean = false;
  ChangePasswordRequest!: ChangePassword;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.changePassForm = new FormGroup({
      email: new FormControl(this.authService.getUserMail()),
      currentPassword: new FormControl(''),
      newPassword: new FormControl(''),
      confirmNewPassword: new FormControl('')
    })
  }

  //Validator Function to check password match in password and confirm-password fields
  checkPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    let pass = control.get('password')?.value
    let confirmPass = control.get('confirmPassword')?.value
    return pass == confirmPass ? null : { notSame: true }
  }

  //Function to toggle password visibility in password fields
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public toggleCurrentPasswordVisibility(): void {
    this.showCurrentPassword = !this.showCurrentPassword;
  }


  submitForm() {
    this.changePassForm.markAllAsTouched();
    if (this.changePassForm.valid) {
      this.ChangePasswordRequest = this.changePassForm.value;
      console.log(this.ChangePasswordRequest);
    }
  }

  get currentPassword(): FormControl {
    return this.changePassForm.get("currentPassword") as FormControl;
  }

  get newPassword(): FormControl {
    return this.changePassForm.get("newPassword") as FormControl;
  }

  get confirmNewPassword(): FormControl {
    return this.changePassForm.get("confirmNewPassword") as FormControl;
  }

}
