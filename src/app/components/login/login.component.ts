import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginFailed = false;
  errorMessage = '';

  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(12)]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.isLoggedIn) {
      console.log('token', this.tokenStorage.getToken());
    }
  }

  check(value: any): any {
    if (value.name && value.password) {
      console.log(value.name, value.password);
      this.authService.login(value.name, value.password).
        subscribe(
              (data: { accessToken: string; }) => {
                this.tokenStorage.saveToken(data.accessToken);
                // this.tokenStorage.saveUser(data);
                this.router.navigate(['admin']).then(() => console.log('logged in'));
            },
          (err: { error: { message: string; }; }) => {
              this.errorMessage = err.error.message;
              this.isLoginFailed = true;
            }
          );
      }
  }


}
