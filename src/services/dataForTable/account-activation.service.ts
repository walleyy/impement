import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AccountActivation} from '../../app/components/dash-board/pages/account-activation/account-activation.component';


const URI = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AccountActivationService {

  constructor(private http: HttpClient) { }
  getAccountAcc(): any {
    return this.http.get<AccountActivation>(URI);
  }
}
