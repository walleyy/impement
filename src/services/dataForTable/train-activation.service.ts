import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TrainingActivation} from '../../app/components/dash-board/pages/ta-report/ta-report.component';

const URI = 'http://localhost:8080/api/';
@Injectable({
  providedIn: 'root'
})
export class TrainActivationService {

  constructor(private http: HttpClient) { }

  getTraining(): any {
    return this.http.get<TrainingActivation>(URI);
  }
}
