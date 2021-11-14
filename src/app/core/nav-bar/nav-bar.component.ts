import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isUserLoggedIn: Boolean = false

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscribeUserLogin()
  }

  subscribeUserLogin() {
    this.authenticationService.currentUser.subscribe(user => {
      if (user?.token) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

}
