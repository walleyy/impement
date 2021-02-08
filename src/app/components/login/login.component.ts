import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import * as moment from 'moment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  sessionTime: any;

  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
    console.log(moment());
    console.log(moment().add(2, 'minutes'));
  }

  check(value: any): any {
    if (value.email && value.password) {
        this.authService.login(value.email, value.password).
        subscribe(
              (data: { accessToken: string; }) => {
                if (data){
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);

                // this.isLoginFailed = false;
                // this.isLoggedIn = true;
                // this.roles = this.tokenStorage.getUser().roles;
                // this.setSession(date, )
              }
            },
          (err: { error: { message: string; }; }) => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
            }
          );
      }
  }


}
