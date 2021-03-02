import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Task } from 'src/app/components/dash-board/pages/task/tables.component';

const URI = 'http://localhost:8080/api/task';
const httpOptions = {
  headers: new HttpHeaders({
    ContentType:  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getTask(): any{
    return this.http.get<Task>(URI + '/index');
  }
  searchTask(id: number): Observable<Task>{
    console.log(URI + '/' + `${id}` );
    return this.http.get<Task>(URI + '/' + `${id}` );
  }

  createTask(task: any): any{
    return this.http.post(URI + '/create', task);
  }

  updateTask(task: any , id: number): any {
    return this.http.put(URI + '/edit/' + `${id}` , task, httpOptions);
  }

  deleteTask(id: number): any {
    return this.http.delete(URI + '/destroy/' + `${id}`);
  }
}
