import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  constructor(private http: HttpClient) { }

  getRoutes(): Observable<any> {
    return this.http.get(environment.baseUrl + '/route');
  }

  postRoute(routeFormData: FormData): Observable<any> {
    return this.http.post<any>(environment.baseUrl + '/route', routeFormData);
  }
}