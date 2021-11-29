import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  faCamera = faCamera;

  user: User;
  profileImage: string;
  coverImage: string;

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  onProfileImageChanged(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      let formData = new FormData();
      formData.append('profile_image', event.target.files[0]);
      this.spinner.show();
      this.updateProfileImage(formData);
    }
  }

  onCoverImageChanged(event: any) {
    if (event.target && event.target.files && event.target.files[0]) {
      let formData = new FormData();
      formData.append('cover_image', event.target.files[0]);
      this.spinner.show();
      this.updateCoverImage(formData);
    }
  }

  deleteAccount() {
    this.spinner.show();
    this.userService.deleteMe().subscribe(val=> {
      this.toastr.success('Account deleted!');
      this.spinner.hide();
      this.authService.logout();
      this.router.navigate(['/']);
    });
  }
  
  private getUser() {
    this.userService.getMe().subscribe(val => {
      this.user = val;
      this.profileImage = environment.host + this.user.profile_image;
      this.coverImage = environment.host + this.user.cover_image;
    })
  }

  private updateProfileImage(imageFormData: FormData) {
    this.userService.updateUsersProfileImage(imageFormData).subscribe(val => {
      this.toastr.success('Profile image successfully updated!');
      this.spinner.hide();
      this.getUser();
    });
  }

  private updateCoverImage(imageFormData: FormData) {
    this.userService.updateUsersCoverImage(imageFormData).subscribe(val => {
      this.toastr.success('Cover image successfully updated!');
      this.spinner.hide();
      this.getUser();
    });
  }
}
