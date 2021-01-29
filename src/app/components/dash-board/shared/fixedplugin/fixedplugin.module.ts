import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FixedPluginComponent} from './fixedplugin.component';
import {RouterModule} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [FixedPluginComponent],
  imports: [
    CommonModule, RouterModule, NgbModule
  ],
  exports: [FixedPluginComponent]
})
export class FixedPluginModule { }
