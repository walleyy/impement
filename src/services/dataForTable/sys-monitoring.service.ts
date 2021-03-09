import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {SupportMonitoring} from '../../app/components/dash-board/pages/sm-report/sm-report.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';

const URI = 'http://localhost:8080/api/support';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SysMonitoringService {

  constructor(private http: HttpClient, private domSanitizer: DomSanitizer) { }

  getMonitoring( ): any {
   return this.http.get<SupportMonitoring>(URI + '/');
  }

  searchSupport(id: number): any{
    console.log(URI + '/' + `${id}` );
    return this.http.get<SupportMonitoring>(URI + '/' + `${id}` );
  }

  createSupport(support: SupportMonitoring): any{
    return this.http.post(URI, support);
  }

  // tslint:disable-next-line:max-line-length
  updateSupport(support: SupportMonitoring, id: number): any {
    return this.http.put(URI + '/' + `${id}` , support);

  }

  deleteSupport(id: number): any {
    return this.http.delete(URI + '/deleteBook/' + `${id}`);
  }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('image', file);

    const req = new HttpRequest('POST', `${URI}/uploadImage`, formData, {
      reportProgress: true,
      responseType: 'text' as 'json',
    });

    return this.http.request(req);
  }

  getBlobThumbnail(obj: any): Observable<Blob> {
    return this.http.post<Blob>(`${URI}/getImage`,
      obj, {  responseType: 'blob' as 'json'   });
  }
}

