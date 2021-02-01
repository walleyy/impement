import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AdminLayoutComponent } from './components/dash-board/admin-layout/admin-layout.component';
import {FooterModule} from './components/dash-board/shared/footer/footer.module';
import {FixedPluginModule} from './components/dash-board/shared/fixedplugin/fixedplugin.module';
import {ToastrModule} from 'ngx-toastr';
import {SidebarModule} from './components/dash-board/sidebar/sidebar.module';
import {NavbarModule} from './components/dash-board/shared/navbar/navbar.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    FooterModule,
    FixedPluginModule,
    SidebarModule,
    NavbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
