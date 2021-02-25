import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SupportMonitoring} from '../../app/components/dash-board/pages/sm-report/sm-report.component';

const URI = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class SysMonitoringService {

  constructor(private http: HttpClient) { }

  getMonitoring( ): any {
   return this.http.get<SupportMonitoring>(URI);
  }
}
