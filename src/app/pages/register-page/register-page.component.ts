import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm: FormGroup;

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

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  register() {
    this.authenticationService.register(this.registerForm.value).subscribe(val => {
      this.login({ email: this.registerForm.value.email, password: this.registerForm.value.password });
    });
  }

  private initializeLoginForm() {
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      username: new FormControl('')
    });
  }

  private login(loginCredentials: any) {
    this.authenticationService.login(loginCredentials).subscribe(val => {
      if (val.token) {
        this.router.navigate(['/']);
      }
    });
  }
}
