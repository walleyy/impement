import { Routes } from '@angular/router';

import { DashBoardComponent } from '../pages/dash-board/dash-board.component';
import { UsersComponent } from '../pages/users/users.component';
import { TablesComponent } from '../pages/tables/tables.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import {SmReportComponent} from '../pages/sm-report/sm-report.component';
import {TaReportComponent} from '../pages/ta-report/ta-report.component';
import {RReportComponent} from '../pages/r-report/r-report.component';

export const AdminLayoutRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard',      component: DashBoardComponent },
  { path: 'user',           component: UsersComponent },
  { path: 'table',          component: TablesComponent },
  { path: 'notifications',  component: NotificationsComponent },
  { path: 'smReport',  component: SmReportComponent },
  { path: 'taReport',  component: TaReportComponent },
  { path: 'rReport',  component: RReportComponent },
];
