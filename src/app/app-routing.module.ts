import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerPageListViewComponent } from './customer-page-list-view/customer-page-list-view.component';
import { NewCustomerPageComponent } from './new-customer-page/new-customer-page.component'

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'customer-page', component: CustomerPageComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'customer-page-list-view', component: CustomerPageListViewComponent},
  {path: 'new-customer-page', component: NewCustomerPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
