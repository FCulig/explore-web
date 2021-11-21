import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { Route } from 'src/app/models/route';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { faUser, faClock, faCamera } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  faCamera = faCamera;
  faUser = faUser;
  faClock = faClock;

  profileImage: string;
  user: User;
  usersRoutes: Route[] = [];
  isProfileEditable: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private authService: AuthenticationService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  onFileChanged(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      let formData = new FormData();
      formData.append('profile_image', event.target.files[0]);
      this.spinner.show();
      this.updateImage(formData);
    }
  }

  private getUser() {
    let username = this.route.snapshot.params.username;
    this.userService.getUser(username).subscribe(val => {
      this.user = val;
      this.usersRoutes = val.routes;
      this.profileImage = environment.host + this.user.profile_image;

      if (this.authService.currentUserValue?.id == val.id) {
        this.isProfileEditable = true
      }
    });
  }

  private updateImage(imageFormData: FormData) {
    this.userService.updateUsersProfileImage(imageFormData).subscribe(val=> {
      this.toastr.success('Profile image successfully updated!');
      this.spinner.hide();
      this.getUser();
    });
  }
}
