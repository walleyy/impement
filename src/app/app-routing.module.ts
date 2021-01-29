import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {AdminLayoutComponent} from './components/dash-board/admin-layout/admin-layout.component';
import {DashBoardComponent} from './components/dash-board/pages/dash-board/dash-board.component';
import {UsersComponent} from './components/dash-board/pages/users/users.component';
import {TablesComponent} from './components/dash-board/pages/tables/tables.component';
import {NotificationsComponent} from './components/dash-board/pages/notifications/notifications.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdminLayoutComponent, children: [
        {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
        { path: 'dashboard',      component: DashBoardComponent },
        { path: 'user',           component: UsersComponent },
        { path: 'table',          component: TablesComponent },
        { path: 'notifications',  component: NotificationsComponent },
      ]
    },
  {path: '**', redirectTo: 'admin'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
