import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';


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

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  check(value: any): any {
    console.log(value);
    this.router.navigate(['/admin']).then(
    );
    // if (value.name && value.password){
    //   this.authService.login(value.email, value.password).
    //   subscribe(
    //     result => {
    //       if ( result ){
    //         // this.router.navigate(['/user:id']).then(r => {console.log(r); });
    //         // this.tokenStorage.saveToken(result.accessToken);
    //         // this.tokenStorage.saveUser(result);
    //         //
    //         // this.isLoginFailed = false;
    //         // this.isLoggedIn = true;
    //         // this.roles = this.tokenStorage.getUser().roles;
    //         if (result.role === 'admin'){
    //           this.router.navigate(['/admin']).then(r => { });
    //         }else {
    //           this.router.navigate(['/User']).then(r => { }); }
    //         console.log(result);
    //       }else {
    //         this.submitted = false;
    //         this.reloadPage();
    //       }
    //     },
    //     err => {
    //       this.errorMessage = err.error.message;
    //       this.isLoginFailed = true;
    //     }
    //   );
    // }

  }
}
