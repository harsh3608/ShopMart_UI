import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    UserLoginComponent,
    AddUserComponent,
    AddSellerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ]
})
export class UserModule { }
