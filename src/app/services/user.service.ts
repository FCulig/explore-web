import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.put(environment.baseUrl + '/user/image', image);
  }
}
