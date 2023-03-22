import { NgModule,CUSTOM_ELEMENTS_SCHEMA,Pipe } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import {AuthGuard} from './services/auth.guard'
import { AddHeaderInterceptor } from './services/webapi.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Page404Component } from './components/page404/page404.component';
import { DirectiveDirective } from './shared/directive.directive';
import { CommonModule } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
    DirectiveDirective
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
   // AuthGuard
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AddHeaderInterceptor, multi: true },
  ],

  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
