import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SysMonitoringService} from '../../../../../services/dataForTable/sys-monitoring.service';


export interface SupportMonitoring {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;
  agentCode: string;
  agentName: string;
  appState: number;
  appAction: string;
  branded: number;
  brandedAction: string;
  cashOut: number;
  collectStationery: number;
  collectStationeryNeed: string;
  latitude: string;
  longitude: string;
  phone: string;
  posAction: string;
  posState: number;
  registerAction: string;
  registerPic: string;
  registerState: number;
  support: number;
  supportNeed: string;
  troubleShooting: string;
  troubleShootingNeed: string;
  user: bigint;
}



@Component({
  selector: 'app-sm-report',
  templateUrl: './sm-report.component.html',
  styleUrls: ['./sm-report.component.scss']
})
export class SmReportComponent implements OnInit, AfterViewInit {

  supportData: [] = [];
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'agentCode', 'agentName', 'appState',
    'appAction', 'branded', 'brandedAction', 'cashOut', 'collectStationery', 'collectStationeryNeed', 'latitude',
    'longitude', 'phone', 'posAction', 'posState', 'registerAction', 'registerPic', 'registerState', 'support',
    'supportNeed', 'troubleShooting', 'troubleShootingNeed', 'userId'];
  dataSource = new MatTableDataSource(this.supportData);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;


  constructor( private supportService: SysMonitoringService) {
    this.supportService.getMonitoring().subscribe(
      (monitorData: any) => {
        this.supportData = monitorData;
        console.log(monitorData);
        this.dataSource = new MatTableDataSource(this.supportData);
      },
      ((err: any) => console.log(err))
    );
  }

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
