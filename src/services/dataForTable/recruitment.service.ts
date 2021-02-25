import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recruitment} from '../../app/components/dash-board/pages/r-report/r-report.component';

const URI = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  constructor(private http: HttpClient) { }

  getRecruitData(): any{
    return this.http.get<Recruitment>(URI);
  }
}
