import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule } from 'ngx-toastr';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsAddComponent } from './products/products-add/products-add.component';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { TableModule } from "primeng/table";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { PaginatorModule } from "primeng/paginator";
import { TooltipModule } from "primeng/tooltip";


@NgModule({
  declarations: [
    SellerHomePageComponent,
    SellerMenuComponent,
    ProductsListComponent,
    ProductsAddComponent
  ],
  imports: [
    CommonModule,
    SellerRoutingModule,
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
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    TableModule,
    MatProgressSpinnerModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,
    PaginatorModule,
    TooltipModule
    
  ],
})
export class SellerModule { }
