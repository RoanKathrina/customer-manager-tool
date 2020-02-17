import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports:      [ BrowserModule,
                  FormsModule,
                  RouterModule,
                  AppRoutingModule],
  declarations: [ AppComponent,
                  LoginComponent],
  exports: [ RouterModule ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
