import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { UserComponent } from './user/user.component';
import { UnauthenComponent } from './unauthen/unauthen.component';
import { SignoffComponent } from './signoff/signoff.component';
// import { EditComponent } from './claim/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
//import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    FooterComponent,
    MainComponent,
    UserComponent,
    UnauthenComponent,
    SignoffComponent,
    // EditComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    //BrowserModule,
    ReactiveFormsModule,
    CalendarModule,
  ],
})
export class HomeModule {}
