import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'customer-page', component: CustomerPageComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}