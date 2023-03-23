import { NgModule } from '@angular/core';
import { PreloadingStrategy, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth.guard';

import { HomeComponent } from './home.component';
import { MainComponent } from './main/main.component';
import { SignoffComponent } from './signoff/signoff.component';
import { UnauthenComponent } from './unauthen/unauthen.component';
import { UserComponent } from './user/user.component';
// import { EditComponent } from './claim/edit/edit.component'

const routes: Routes = [
  {
    path: '', component: HomeComponent,

    children: [
      { path: '', component: MainComponent, canActivate: [AuthGuard] },
      { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
      { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
      // { path: 'claim/edit', component: EditComponent, canActivate: [AuthGuard], data: { tasks_id: 'claimedit' } },
      { path: 'claim', loadChildren: () => import('./claim/claim.module').then(m => m.ClaimModule), canActivate: [AuthGuard],data: { tasks_id: 'claimedit' } },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule), canActivate: [AuthGuard],data: { tasks_id: 'claimedit' } },
      { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard] },

      { path: 'unauthen', component: UnauthenComponent }
    ]
  },
  {
    path: 'signoff', component: SignoffComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
