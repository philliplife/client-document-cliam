//import { IquiryRoutingModule } from './iquiry/iquiry-routing.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClaimComponent } from './claim.component';
import { AuthGuard } from 'src/app/services/auth.guard';
//import {EditComponent} from './edit-unused/edit.component';
// import{ListclaimComponent} from './listclaim/listclaim.component'
// import {EditstdComponent} from './editstd/editstd.component'
import {SearchpageComponent} from './searchpage/searchpage.component'


const routes: Routes = [
  { path: '', component:ClaimComponent,
children:[
// { path: '', component: ListclaimComponent, canActivate: [AuthGuard],data: { tasks_id: 'claimedit' }  },
 { path: '', redirectTo: 'edit', pathMatch: 'full', data: { tasks_id: 'claimedit' }  },
 // { path: 'edit', component: SearchpageComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
 // { path: 'edit', component: ListclaimComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
 // { path: 'editstd', component: EditstdComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
  { path: 'edit', loadChildren: () => import('./showpage/showpage.module').then(m => m.ShowpageModule), canActivate: [AuthGuard],data: { tasks_id: 'claimedit' } },
  { path: 'iquiry', loadChildren: () => import('./iquiry/iquiry.module').then(m => m.IquiryModule), canActivate: [AuthGuard],data: { tasks_id: 'claiminq' } },


]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClaimRoutingModule { }
