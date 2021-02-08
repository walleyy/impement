import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  check(value: any): any {
    if (value.email && value.password) {
        this.authService.login(value.email, value.password)
          .subscribe(
            () => {
              console.log('User is logged in');
              this.router.navigateByUrl('/').then(r => console.log(value));
            }
          );
      }
  }
}
