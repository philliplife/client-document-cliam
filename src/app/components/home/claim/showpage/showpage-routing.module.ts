import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowpageComponent} from './showpage.component'
import { AuthGuard } from 'src/app/services/auth.guard';
import{ListclaimComponent} from './listclaim/listclaim.component'
import {EditstdComponent} from './editstd/editstd.component'
import {ViewComponent} from './view/view.component'

const routes: Routes = [
  { path: '', component:ShowpageComponent,
children:[
{ path: '', component: ListclaimComponent, canActivate: [AuthGuard],data: { tasks_id: 'claimedit' }  },
 { path: '', redirectTo: 'showlist', pathMatch: 'full', data: { tasks_id: 'claimedit' }  },
 // { path: 'edit', component: SearchpageComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
 { path: 'showlist', component: ListclaimComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
 { path: 'editstd', component: EditstdComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
 { path: 'view', component: ViewComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
  //{ path: 'edit', loadChildren: () => import('./showpage/showpage.module').then(m => m.ShowpageModule), canActivate: [AuthGuard],data: { tasks_id: 'claimedit' } },


]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowpageRoutingModule { }
