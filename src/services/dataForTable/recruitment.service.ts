import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Recruitment} from '../../app/components/dash-board/pages/r-report/r-report.component';

const URI = 'http://localhost:8080/api/recruitment';

@Injectable({
  providedIn: 'root'
})
export class RecruitmentService {

  constructor(private http: HttpClient) { }

  getRecruitData(): any{
    return this.http.get<Recruitment>(URI + '/');
  }

  searchRecruitment(id: number): any{
    console.log(URI + '/' + `${id}` );
    return this.http.get<Recruitment>(URI + '/' + `${id}` );
  }

  createRecruitment(recruitment: Recruitment): object{
    return this.http.post(URI, {recruitment});
  }

  updateRecruitment(recruitment: Recruitment , id: number): any {
    return this.http.put(URI + '/' + `${id}` , {recruitment});

  }

  deleteRecruitment(id: number): any {
    return this.http.delete(URI + '/deleteRecruitment/' + `${id}`);
  }

}
