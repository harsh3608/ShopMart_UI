import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';

const routes: Routes = [{
  path: 'seller',
  component: SellerHomePageComponent
},
{
  path: 'seller-menu',
  component: SellerMenuComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
