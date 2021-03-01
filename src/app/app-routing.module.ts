import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminLayoutComponent} from './components/dash-board/admin-layout/admin-layout.component';
import {AuthGuardService as AuthGuard} from '../services/auth-guard.service';

const routes: Routes = [
  {path: '', redirectTo: 'login' , pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '', canActivate: [AuthGuard],
        loadChildren: './components/dash-board/admin-layout/admin-layout.module#AdminLayoutModule'
      }]},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
