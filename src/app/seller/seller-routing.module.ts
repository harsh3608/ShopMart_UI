import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsAddComponent } from './products/products-add/products-add.component';
import { SellerGuard } from '../user/shared/authorization/guards/seller.guard';

export const routes: Routes = [{
  path: 'seller',
  component: SellerMenuComponent,
  canActivate: [SellerGuard]
},
{
  path: 'seller-home',
  component: SellerHomePageComponent,
  canActivate: [SellerGuard]
},
{
  path: 'products-list',
  component: ProductsListComponent,
  canActivate: [SellerGuard]
},
{
  path: 'products-add',
  component: ProductsAddComponent,
  canActivate: [SellerGuard]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
