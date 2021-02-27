import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TrainingActivation} from '../../app/components/dash-board/pages/ta-report/ta-report.component';

const URI = 'http://localhost:8080/api/training';
@Injectable({
  providedIn: 'root'
})
export class TrainActivationService {

  constructor(private http: HttpClient) { }

  getTraining(): any {
    return this.http.get<TrainingActivation>(URI + '/index' );
  }

  searchTraining(id: number): any{
    console.log(URI + '/' + `${id}` );
    return this.http.get<TrainingActivation>(URI + '/' + `${id}` );
  }

  createTraining(training: TrainingActivation): object{
    return this.http.post(URI, {training});
  }

  updateTraining(training: TrainingActivation , id: number): any {
    return this.http.put(URI + '/' + `${id}` , {training});

  }

  deleteAccActivation(id: number): any {
    return this.http.delete(URI + '/deleteTraining/' + `${id}`);
  }

}
