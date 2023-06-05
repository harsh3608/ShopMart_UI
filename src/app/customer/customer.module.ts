import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerMenuComponent } from './customer-menu/customer-menu.component';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';


@NgModule({
  declarations: [
    CustomerMenuComponent,
    CustomerHomePageComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
