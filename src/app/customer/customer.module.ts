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
import { SellerModule } from '../seller/seller.module';
import { CartComponent } from './cart/cart.component';
import { FavouritesComponent } from './favourites/favourites.component';
import { AddressComponent } from './address/address.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CustomerMenuComponent,
    CustomerHomePageComponent,
    ProductsPoolComponent,
    CartComponent,
    FavouritesComponent,
    AddressComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    }),
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    SellerModule,
  ]
})
export class CustomerModule { }
