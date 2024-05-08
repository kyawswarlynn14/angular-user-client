// login.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = {
    email: '', // Add an email property
    password: '', // Add a password property
  };

  constructor(
    private userService: UserService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  login() {
    this.userService.login(this.credentials).subscribe(
      (response) => {
        console.log('Login successful', response);
        this.cookieService.set('email', response.user.email);
        this.cookieService.set('access_token', response.accessToken);
        if(response.user.role === 1) {
          this.router.navigate(['/user-list']);
        } else {
          this.router.navigate(['/user-info']);
        }
      },
      (error) => {
        alert(error?.error?.message)
        console.error('Login error', error);
      }
    );
  }
}
