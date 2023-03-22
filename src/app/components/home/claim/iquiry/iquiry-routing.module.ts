import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IquiryComponent } from './iquiry.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import {ShowlistComponent} from './showlist/showlist.component';
import {ViewComponent} from './view/view.component';
const routes: Routes = [
  { path: '', component:IquiryComponent,
  // children:[
  //   { path: '', component: IquiryComponent, canActivate: [AuthGuard],data: { tasks_id: 'claiminq' }  },

  // ]
  children:[
    { path: '', component: ShowlistComponent, canActivate: [AuthGuard],data: { tasks_id: 'claiminq' }  },
     { path: '', redirectTo: 'showlist', pathMatch: 'full', data: { tasks_id: 'claiminq' }  },
     { path: 'showlist', component: ShowlistComponent, canActivate: [AuthGuard], data: { tasks_id: 'claiminq' } },
    //  { path: 'editstd', component: EditstdComponent, canActivate: [AuthGuard], data: { tasks_id: 'claiminq' } },
     { path: 'view', component: ViewComponent, canActivate: [AuthGuard], data: { tasks_id: 'claiminq' } },
      //{ path: 'edit', loadChildren: () => import('./showpage/showpage.module').then(m => m.ShowpageModule), canActivate: [AuthGuard],data: { tasks_id: 'claimedit' } },


    ]
}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IquiryRoutingModule { }
