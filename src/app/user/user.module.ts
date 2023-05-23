import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    UserLoginComponent,
    AddUserComponent,
    AddSellerComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatDialogModule
  ]
})
export class UserModule { }
