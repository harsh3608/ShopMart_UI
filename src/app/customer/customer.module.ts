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
import { ProductsPoolComponent } from './products-pool/products-pool.component';
import { MatGridListModule } from "@angular/material/grid-list";


@NgModule({
  declarations: [
    CustomerMenuComponent,
    CustomerHomePageComponent,
    ProductsPoolComponent
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
    MatGridListModule,
  ]
})
export class CustomerModule { }
