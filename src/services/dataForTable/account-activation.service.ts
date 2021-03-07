import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountActivation} from '../../app/components/dash-board/pages/account-activation/account-activation.component';
import {Observable} from 'rxjs';


const URI = 'http://localhost:8080/api/accountActivation';

@Injectable({
  providedIn: 'root'
})
export class AccountActivationService {

  constructor(private http: HttpClient) { }

  getAccountActData(): Observable<AccountActivation> {
    return this.http.get<AccountActivation>(URI + '/');
  }

  searchAccount(id: number): Observable<AccountActivation>{
    console.log(URI + '/' + `${id}` );
    return this.http.get<AccountActivation>(URI + '/' + `${id}` );
  }

  createAccActivation(account: AccountActivation): object{
    return this.http.post(URI, account);
  }

  updateAccActivation(account: AccountActivation , id: number): any {
    return this.http.put(URI + '/' + `${id}` , account);
  }

  deleteAccActivation(id: number): any {
    return this.http.delete(URI + '/deleteAccActivation/' + `${id}`);
  }
}
