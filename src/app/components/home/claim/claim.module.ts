import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimComponent } from './claim.component';
//import { EditComponent } from './edit-unused/edit.component';
//import { ListclaimComponent } from './listclaim/listclaim.component';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';
//import { EditstdComponent } from './editstd/editstd.component';
import { SearchpageComponent } from './searchpage/searchpage.component';


@NgModule({
  declarations: [
    ClaimComponent,
    //EditComponent,
    // ListclaimComponent,
    // EditstdComponent,
    SearchpageComponent
  ],
  imports: [
    //BrowserAnimationsModule,
    CommonModule,
    ClaimRoutingModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ClaimModule { }
