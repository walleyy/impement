import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountOpening} from '../../app/components/dash-board/pages/account-opening/account-opening.component';

const URI = 'http://localhost:8080/api/accountOpening';

@Injectable({
  providedIn: 'root'
})
export class AccountOpeningService {

  constructor(private http: HttpClient) { }
  getAccOpening(): any{
    return this.http.get<AccountOpening>(URI + '/');
  }
  searchAccOpening(id: number): Observable<AccountOpening>{
    console.log(URI + '/' + `${id}` );
    return this.http.get<AccountOpening>(URI + '/' + `${id}` );
  }

  createAccOpening(Opening: AccountOpening): object{
    return this.http.post(URI, {Opening});
  }

  updateAccOpening(Opening: AccountOpening , id: number): any {
    return this.http.put(URI + '/' + `${id}` , {Opening});
  }

  deleteAccOpening(id: number): any {
    return this.http.delete(URI + '/deleteAccOpening/' + `${id}`);
  }
}
