import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { IquiryRoutingModule } from './iquiry-routing.module';
import { IquiryComponent } from './iquiry.component';
import { ShowlistComponent } from './showlist/showlist.component';
import { ViewComponent } from './view/view.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IquiryComponent,
    ShowlistComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    IquiryRoutingModule,
    TableModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class IquiryModule { }
