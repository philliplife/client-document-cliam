import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import { ShowpageRoutingModule } from './showpage-routing.module';
import { ShowpageComponent } from './showpage.component';
import { ListclaimComponent } from './listclaim/listclaim.component';
import { EditstdComponent } from './editstd/editstd.component';
import { ViewComponent } from './view/view.component';
import {FormsModule} from '@angular/forms'



@NgModule({
  declarations: [
    ShowpageComponent,
    ListclaimComponent,
    EditstdComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    ShowpageRoutingModule,
    TableModule,
    FormsModule

    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShowpageModule { }
