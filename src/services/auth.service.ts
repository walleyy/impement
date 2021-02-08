import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { shareReplay} from 'rxjs/operators';

export  interface User {
  email: string;
  name: string;
  password: string;
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = '';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  logout(): any{
    this.router.navigate(['logout']).then();
  }

  login(email: any, password: any): any {
    return this.http.post<User>(AUTH_API, {email, password}, httpOptions)
      .pipe(
        shareReplay());
  }
}
