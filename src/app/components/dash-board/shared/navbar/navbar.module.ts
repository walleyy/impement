import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [NavbarComponent],
  imports: [
    RouterModule, CommonModule, NgbModule, FormsModule, ReactiveFormsModule
  ],
  exports: [ NavbarComponent ]
})
export class NavbarModule {}
