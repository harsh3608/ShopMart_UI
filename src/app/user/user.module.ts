import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { UserRoutingModule } from './user-routing.module';
import { UserLoginComponent } from './user-login/user-login.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { MatDialogModule } from "@angular/material/dialog";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';

@NgModule({
  declarations: [
    UserLoginComponent,
    AddUserComponent,
    AddSellerComponent,
    UserHomePageComponent
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
    MatSelectModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ]
})
export class UserModule { }
