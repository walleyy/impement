import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {TokenStorageService} from '../../../services/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(5)]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService, private tokenStorage: TokenStorageService,
              public toast: ToastrService) { }

  ngOnInit(): void {
    if (this.tokenStorage.isLoggedIn) {
      console.log('token', this.tokenStorage.getToken());
    }
  }

  check(value: any): any {
    if (value.username && value.password) {
      console.log(value.username, value.password);
      this.authService.login(value.username, value.password).
        subscribe(
              (data: any) => {
                this.tokenStorage.saveToken(data.accessToken);
                // this.tokenStorage.saveUser(data);
                console.log(data.accessToken);
                this.router.navigate(['admin']).then(() => console.log('logged in'));
            },
          (err: { error: { message: string; }; }) => {
                this.toast.error('Login failed' , 'error');
              // this.errorMessage = err.error.message;
              // this.isLoginFailed = true;
            }
          );
      }
  }


}
