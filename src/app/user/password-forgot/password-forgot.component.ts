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

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<PasswordForgotComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }


  OpenResetPasswordDialog() {
    this.passForm.markAllAsTouched();
    if (this.passForm.valid) {
    this.dialogRef.close();

    //assigning form value to interface
    this.emailValue = this.passForm.value; 
    
    //open the reset dialog
    const dialogRef = this.dialog.open(PasswordResetComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
    }
  }


  get email(): FormControl {
    return this.passForm.get("email") as FormControl;
  }
}
