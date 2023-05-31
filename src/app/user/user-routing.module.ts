import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserHomePageComponent } from './user-home-page/user-home-page.component';
import { CustomerGuard } from './shared/authorization/guards/customer.guard';

const routes: Routes = [{
  path: 'home',
  component: UserHomePageComponent,
  canActivate: [CustomerGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
