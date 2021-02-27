import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SupportMonitoring} from '../../app/components/dash-board/pages/sm-report/sm-report.component';

const URI = 'http://localhost:8080/api/support';
@Injectable({
  providedIn: 'root'
})
export class SysMonitoringService {

  constructor(private http: HttpClient) { }

  getMonitoring( ): any {
   return this.http.get<SupportMonitoring>(URI + '/');
  }

  searchSupport(id: number): any{
    console.log(URI + '/' + `${id}` );
    return this.http.get<SupportMonitoring>(URI + '/' + `${id}` );
  }

  createSupport(support: SupportMonitoring): object{
    return this.http.post(URI, {support});
  }

  updateSupport(support: SupportMonitoring , id: number): any {
    return this.http.put(URI + '/' + `${id}` , {support});

  }

  deleteSupport(id: number): any {
    return this.http.delete(URI + '/deleteBook/' + `${id}`);
  }

}
