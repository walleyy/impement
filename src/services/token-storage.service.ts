import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';

const TOKEN_KEY = 'auth-token';
// const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(public jwtHelper: JwtHelperService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    const authToken = window.sessionStorage.getItem(TOKEN_KEY);
    return (authToken !== null);
  }

  public isAuthenticated(): boolean {
    const token = window.sessionStorage.getItem(TOKEN_KEY);
    // @ts-ignore
    return !this.jwtHelper.isTokenExpired(token);
  }

  // public saveUser(user: any): void {
  //   window.sessionStorage.removeItem(USER_KEY);
  //   window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  // }
}
