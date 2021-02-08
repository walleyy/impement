import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/dash-board/admin-layout/admin-layout.component';
import {FooterModule} from './components/dash-board/shared/footer/footer.module';
import {FixedPluginModule} from './components/dash-board/shared/fixedplugin/fixedplugin.module';
import {ToastrModule} from 'ngx-toastr';
import {SidebarModule} from './components/dash-board/sidebar/sidebar.module';
import {NavbarModule} from './components/dash-board/shared/navbar/navbar.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AdminLayoutModule} from './components/dash-board/admin-layout/admin-layout.module';
import {MatDialogModule} from '@angular/material/dialog';
import { TaReportComponent } from './components/dash-board/pages/ta-report/ta-report.component';
import { RReportComponent } from './components/dash-board/pages/r-report/r-report.component';
import { LogsComponent } from './components/dash-board/pages/logs/logs.component';
import {AuthService} from '../services/auth.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
    TaReportComponent,
    RReportComponent,
    LogsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    FooterModule,
    FixedPluginModule,
    SidebarModule,
    NavbarModule,
    MatFormFieldModule,
    NgbModule,
    AdminLayoutModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
