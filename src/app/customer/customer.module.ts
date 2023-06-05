import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    CustomerMenuComponent,
    CustomerHomePageComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ]
})
export class CustomerModule { }
