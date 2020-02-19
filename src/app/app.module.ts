import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerPageComponent } from './customer-page/customer-page.component';
import { SignupComponent } from './signup/signup.component';
import { CustomerPageListViewComponent } from './customer-page-list-view/customer-page-list-view.component';

@NgModule({
  imports:      [ BrowserModule,
                  CommonModule,
                  FormsModule,
                  RouterModule,
                  AppRoutingModule,
                  ReactiveFormsModule],

  declarations: [ AppComponent,
                  LoginComponent,
                  CustomerPageComponent,
                  SignupComponent,
                  CustomerPageListViewComponent],
  exports: [ RouterModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
