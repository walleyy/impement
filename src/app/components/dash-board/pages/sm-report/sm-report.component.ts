import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {SysMonitoringService} from '../../../../../services/dataForTable/sys-monitoring.service';


export interface SupportMonitoring {
  id: bigint;
  created_at: Date;
  updated_at: Date;
  agent_code: string;
  agent_name: string;
  app_state: number;
  app_action: string;
  branded: number;
  branded_action: string;
  cash_out: number;
  collect_stationary: number;
  collect_stationary_need: string;
  latitude: string;
  longitude: string;
  phone: string;
  pos_action: string;
  pos_state: number;
  register_action: string;
  register_pic: string;
  register_state: number;
  suppot: number;
  support_need: string;
  troubleshooting: number;
  troubleshooting_need: string;
  user_id: bigint;
}



@Component({
  selector: 'app-sm-report',
  templateUrl: './sm-report.component.html',
  styleUrls: ['./sm-report.component.scss']
})
export class SmReportComponent implements OnInit, AfterViewInit {

  supportData: [] = [];
 support2 = [
  {
    id: 1,
    created_at: 2242020,
    updated_at: 23420201,
    agent_code: 'bama',
    agent_name: 'sata',
    app_state: 344,
    app_action: 'safe',
    branded: 23,
    branded_action: 'ac',
    cash_out: 23,
    collect_stationary: 3,
    collect_stationary_need: 'sas',
    latitude: 'sad',
    longitude: 'asf',
    phone: '098709876',
    pos_action: 'safe',
    pos_state: 1,
    register_action: 'asf',
    register_pic: 'asf',
    register_state: 3,
    suppot: 3,
    support_need: 'ask',
    troubleshooting: 34,
    troubleshooting_need: 'string',
    user_id: 3444444444444,
  }
];
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt', 'agentCode', 'agentName', 'appState',
    'appAction', 'branded', 'brandedAction', 'cashOut', 'collectStationary', 'collectStationaryNeed', 'latitude',
    'longitude', 'phone', 'posAction', 'posState', 'registerAction', 'registerPic', 'registerState', 'suppot',
    'supportNeed', 'troubleshooting', 'troubleshootingNeed', 'userId'];
  dataSource = new MatTableDataSource(this.support2);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;


  constructor( private supportService: SysMonitoringService) {
    this.supportData = this.supportService.getMonitoring();
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
