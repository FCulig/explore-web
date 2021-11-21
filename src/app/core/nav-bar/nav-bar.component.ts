import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  userIcon = faUserCircle
  isUserLoggedIn: Boolean = false
  username: string;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.subscribeUserLogin()
  }

  subscribeUserLogin() {
    this.authenticationService.currentUser.subscribe(user => {
      if (user?.token) {
        this.isUserLoggedIn = true;
        this.username = user.username;
      } else {
        this.isUserLoggedIn = false;
      }
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
