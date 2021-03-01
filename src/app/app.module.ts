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
import {HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './helper/auth.interceptor';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';


export function tokenGetter(): any {
  return 'SOME_TOKEN';
}

export function getAuthScheme(request: any): any {
  return 'Bearer ';
}

export function jwtOptionsFactory(): any {
  return {
    tokenGetter,
    authScheme: getAuthScheme,
  };
}
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
    JwtModule.forRoot(
      {
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
        },
      }
    ),
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
  providers: [AuthInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule {}
