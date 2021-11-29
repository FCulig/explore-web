import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(username: string): Observable<any> {
    return this.http.get(environment.baseUrl + '/user/' + username);
  }

  updateUsersProfileImage(image: FormData) {
    return this.http.put(environment.baseUrl + '/user/profile-image', image);
  }

  updateUsersCoverImage(image: FormData) {
    return this.http.put(environment.baseUrl + '/user/cover-image', image);
  }

  getMe(): Observable<any> {
    return this.http.get(environment.baseUrl + 'auth/me');
  }

  deleteMe(): Observable<any> {
    return this.http.delete(environment.baseUrl + 'user');
  }
}
