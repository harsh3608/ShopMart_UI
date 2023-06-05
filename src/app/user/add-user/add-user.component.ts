import { Component, Inject, OnInit } from '@angular/core';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddUser, DialogData } from '../shared/models/user.models';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/authorization/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  genderOptions: string[] = [
    'Male','Female','Other'
  ];
  addUserForm!: FormGroup;
  public showPassword: boolean = false;
  addUserRequest!: AddUser;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      personName: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern("[0-9]*.{10,10}")]),
      password: new FormControl('', [Validators.required,
        Validators.minLength(6),
        Validators.maxLength(15),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{6,15}')
        ]),
      confirmPassword: new FormControl('', [Validators.required]),
      userType: new FormControl(this.data.userRole),
    }, { validators: this.checkPasswords });
  }

  submitAddForm(){
    this.addUserForm.markAllAsTouched();
    if (this.addUserForm.valid) {
      this.addUserRequest = this.addUserForm.value;
      this.userService.AddUserOrSeller(this.addUserRequest).subscribe({
        next: (res)=>{
          if(res.isSuccess && res.statusCode == 200){
            if(res.response.userType == 'Customer'){
              this.authService.setToken(res.response.token);
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
              this.router.navigate(['/seller'])
            }
          } else if(!res.isSuccess){
            this.toastr.error(res.message, 'Success!',{
              timeOut: 2000,
            });
          }
        }
      })
    }
  }

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

  get personName(): FormControl {
    return this.addUserForm.get("personName") as FormControl;
  }
  get gender(): FormControl {
    return this.addUserForm.get("gender") as FormControl;
  }

  get email(): FormControl {
    return this.addUserForm.get("email") as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.addUserForm.get("phoneNumber") as FormControl;
  }

  get password(): FormControl {
    return this.addUserForm.get("password") as FormControl;
  }

  get confirmPassword(): FormControl {
    return this.addUserForm.get("confirmPassword") as FormControl;
  }
  

}
