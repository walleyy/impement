import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutModule} from '../../admin-layout/admin-layout.module';
import {MatListModule} from '@angular/material/list';
import {MatLineModule} from '@angular/material/core';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    RouterModule, CommonModule, NgbModule,
    FormsModule, ReactiveFormsModule,
    AdminLayoutModule, MatListModule,
    MatListModule, MatLineModule,
    MatListModule, MatListModule,
    MatListModule, MatListModule
  ],
  exports: [ NavbarComponent ]
})
export class NavbarModule {}
