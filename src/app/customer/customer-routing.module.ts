import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerHomePageComponent } from './customer-home-page/customer-home-page.component';
import { CustomerGuard } from '../user/shared/authorization/guards/customer.guard';

const routes: Routes = [{
  path: 'shop-home',
  component: CustomerHomePageComponent,
  canActivate: [CustomerGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
