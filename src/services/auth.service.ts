import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { shareReplay} from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';

export  interface User {
  email: string;
  name: string;
  password: string;
}
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const AUTH_API = 'http://localhost:8080/api/auth/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient, private tokenStorage: TokenStorageService) { }

  logout(): any{
    this.tokenStorage.signOut();
    this.router.navigate(['login']).then( () => console.log('logged out'));
  }

  login(username: any, password: any): any {
    return this.http.post(AUTH_API, {username, password}, httpOptions)
      .pipe(
        shareReplay());
  }
}
