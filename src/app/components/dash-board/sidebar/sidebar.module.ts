import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {SidebarComponent} from './sidebar.component';
import {NgbAccordionModule} from '@ng-bootstrap/ng-bootstrap';
import {AdminLayoutModule} from '../admin-layout/admin-layout.module';



@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule, RouterModule, NgbAccordionModule, AdminLayoutModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
