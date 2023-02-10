import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export interface LoginResponse {
  token: string;
  token_type: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (this.loginForm.valid) {
      let response = this.authService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
      response.subscribe((loginResponse: LoginResponse) => {
        localStorage.setItem('token', loginResponse.token);
        this.router.navigate(['home']);
      });
    }
  }
}
