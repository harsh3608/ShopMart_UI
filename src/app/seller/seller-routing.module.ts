import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsAddComponent } from './products/products-add/products-add.component';

export const routes: Routes = [{
  path: 'seller',
  component: SellerMenuComponent
},
{
  path: 'seller-home',
  component: SellerHomePageComponent,
},
{
  path: 'products-list',
  component: ProductsListComponent,
},
{
  path: 'products-add',
  component: ProductsAddComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
