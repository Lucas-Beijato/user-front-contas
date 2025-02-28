import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NgClass, NgIf } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  successMes: string | null = null;
  errorMes: string | null = null;
  loading: boolean = false;
  passVisible: boolean = false;

  loginForm = new FormGroup({
    id: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(
    private auth: AuthService,
    private cookies: CookieService,
    private router: Router
  ) { }

  passVisibility() {
    this.passVisible = !this.passVisible;
  }

  onSubmit() {
    if (this.loginForm.value.id && this.loginForm.value.password) {
      this.loading = true;
      this.auth.login(this.loginForm.value.id, this.loginForm.value.password).subscribe({
        next: (res) => {

          if ('data' in res.body!) {
            const today = new Date()
            const tokenTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), (today.getHours() + 1), today.getMinutes(), today.getSeconds())
            this.cookies.set('contasTokenUser', res.body.data.token, { expires: tokenTime, path: '/' });

            while (this.cookies.get("contasTokenUser") === "") { console.log('validating token') }

            this.router.navigate(['/dash']);
          }

          this.loading = false
        },
        error: (res) => {
          if ('error' in res!) {
            this.errorMes = res.error.error
          }
          console.log(res)
          this.loading = false
        },
        complete: () => {
          this.loading = false
        }
      })
    }
  }

}
