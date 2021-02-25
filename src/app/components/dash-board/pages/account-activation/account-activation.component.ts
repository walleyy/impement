import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

export interface AccountActivation {
  id: bigint;
  created_at: Date;
  updated_at: Date;
  agent_name: string;
  device_action: string;
  device_available: number;
  latitude: string;
  location: string;
  longitude: string;
  phone: string;
  course_id: string;
  user_id: string;
}

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
  styleUrls: ['./account-activation.component.scss']
})
export class AccountActivationComponent implements OnInit, AfterViewInit {

  accountActivation: [] = [];

  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'agentName', 'deviceAction',
    'deviceAvailable', 'latitude', 'location', 'longitude', 'phone', 'courseId', 'userId'];
  dataSource = new MatTableDataSource(this.accountActivation);

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event): any {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
