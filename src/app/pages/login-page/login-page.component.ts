import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;

  hide = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue?.token) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.initializeLoginForm();
  }

  login() {
    this.authenticationService.login(this.loginForm.value).subscribe(val => {
      if (val.token) {
        this.router.navigate(['/']);
      }
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  private initializeLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }
}
