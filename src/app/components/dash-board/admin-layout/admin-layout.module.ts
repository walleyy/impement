import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';

import { DashBoardComponent } from '../pages/dash-board/dash-board.component';
import { UsersComponent } from '../pages/users/users.component';
import { TablesComponent } from '../pages/tables/tables.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  declarations: [
    DashBoardComponent,
    UsersComponent,
    TablesComponent,
    NotificationsComponent,
  ]
})

export class AdminLayoutModule {}
