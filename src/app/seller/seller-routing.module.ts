import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerMenuComponent } from './seller-menu/seller-menu.component';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';

export const routes: Routes = [{
  path: 'seller',
  component: SellerMenuComponent
},
{
  path: 'seller-home',
  component: SellerHomePageComponent,
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
