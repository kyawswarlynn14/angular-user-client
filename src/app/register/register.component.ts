// register.component.ts

import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  user : any = {
    name: '',
    email: '',
    password: '',
  };

  constructor(private userService: UserService, private router: Router) {}

  register() {
    this.userService.register(this.user).subscribe(
      (response) => {
        alert('Registration successful')
        console.log('Registration successful', response);
        this.user = {};
        this.router.navigate(['/login']);
      },
      (error) => {
        alert(error.error.message)
        console.error('Registration error', error);
      }
    );
  }
}
