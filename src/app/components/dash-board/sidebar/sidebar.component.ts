import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: 'dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' },
  { path: 'notifications', title: 'Notifications',     icon: 'nc-bell-55',    class: '' },
  { path: 'table',         title: 'Task',        icon: 'nc-tile-56',    class: '' },
  { path: 'manageUsers',   title: 'Manage Users',        icon: 'nc-single-02',    class: '' },
];

@Component({
  moduleId: module.id,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss']
})

export class SidebarComponent implements OnInit {
  public menuItems: any[] = [];
  ngOnInit(): void {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}
