import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SellerHomePageComponent } from './seller-home-page/seller-home-page.component';

const routes: Routes = [{
  path: 'seller',
  component: SellerHomePageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
