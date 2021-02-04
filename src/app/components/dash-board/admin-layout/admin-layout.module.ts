import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { DashBoardComponent } from '../pages/dash-board/dash-board.component';
import { UsersComponent } from '../pages/users/users.component';
import { TablesComponent } from '../pages/tables/tables.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {RouterModule} from '@angular/router';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {DialogComponent} from '../shared/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {SmReportComponent} from '../pages/sm-report/sm-report.component';
import {RReportComponent} from '../pages/r-report/r-report.component';
import {TaReportComponent} from '../pages/ta-report/ta-report.component';


@NgModule({
    imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        MatTableModule,
        RouterModule.forChild(AdminLayoutRoutes),
        ReactiveFormsModule,
        NgbModule,
        MatButtonModule,
        MatPaginatorModule,
        MatDialogModule
    ],
  declarations: [
    DashBoardComponent,
    UsersComponent,
    TablesComponent,
    NotificationsComponent,
    DialogComponent,
    SmReportComponent
  ],
  exports: [
    MatInputModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  entryComponents: [
    SmReportComponent,
    DialogComponent,
    RReportComponent,
    TaReportComponent
  ]
})

export class AdminLayoutModule {}
