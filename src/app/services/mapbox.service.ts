import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {

  constructor(private http: HttpClient) { }

  getDirections(type: String, coordinates: String): Observable<any> {
    return this.http.get(
      environment.mapbox.baseUrl + '/directions/v5/mapbox/' + type + '/' +
      coordinates + '?alternatives=false&geometries=geojson&steps=false&access_token=' + environment.mapbox.accessToken
    );
  }
}
