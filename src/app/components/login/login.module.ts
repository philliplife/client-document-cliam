import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
// import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    LoginComponent,
    // Page404Component,
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,ReactiveFormsModule
  ]
})
export class LoginModule { }
