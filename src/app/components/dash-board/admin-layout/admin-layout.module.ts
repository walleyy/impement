import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { DashBoardComponent } from '../pages/dash-board/dash-board.component';
import { UsersComponent } from '../pages/users/users.component';
import { TablesComponent, DetailsComponent, EditComponent } from '../pages/tables/tables.component';
import { NotificationsComponent } from '../pages/notifications/notifications.component';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import {CdkTableModule} from '@angular/cdk/table';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {AuthInterceptor} from '../../../helper/auth.interceptor';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatLineModule} from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';


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
    MatDialogModule,
    CdkTableModule,
    MatIconModule,
    MatExpansionModule,
    MatBadgeModule,
    MatListModule,
    MatLineModule,
    NgbDropdownModule,
    MatDividerModule
  ],
  declarations: [
    DashBoardComponent,
    UsersComponent,
    TablesComponent,
    NotificationsComponent,
    DialogComponent,
    SmReportComponent,
    DetailsComponent,
    EditComponent
  ],
  exports: [
    MatInputModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatExpansionModule,
    MatBadgeModule,
    MatListModule,
    MatLineModule,
    NgbDropdownModule,
    MatDividerModule
  ],
  entryComponents: [
    SmReportComponent,
    DialogComponent,
    RReportComponent,
    TaReportComponent,
    DetailsComponent,
    EditComponent
  ],
  providers: [AuthInterceptor]
})

export class AdminLayoutModule {}
