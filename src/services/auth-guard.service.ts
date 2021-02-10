import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {TokenStorageService} from './token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(
    public authToken: TokenStorageService,
    public router: Router,
    public toast: ToastrService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authToken.isAuthenticated()) {
      this.toast.error('Not allowed', 'invalid user');
      this.router.navigate(['login']).then(r => console.log('not allowed'));
      return false;
    }
    return true;
  }
}
