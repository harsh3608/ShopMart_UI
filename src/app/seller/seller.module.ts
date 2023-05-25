import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerRoutingModule } from './seller-routing.module';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';


@NgModule({
  declarations: [
    SellerHomePageComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule
  ]
})
export class SellerModule { }
