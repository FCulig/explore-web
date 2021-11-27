import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { GeoJsonObject, Geometry } from 'geojson';
import * as mapboxgl from 'mapbox-gl';
import { Route } from 'src/app/models/route';
import { MapboxService } from 'src/app/services/mapbox.service';
import { RouteService } from 'src/app/services/route.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-route-page',
  templateUrl: './route-page.component.html',
  styleUrls: ['./route-page.component.css']
})
export class RoutePageComponent implements OnInit {

  route: Route;
  image: string;
  map: mapboxgl.Map;
  instructions: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private routeService: RouteService,
    private mapboxService: MapboxService
  ) { }

  ngOnInit(): void {
    this.getRoute();
  }

  private getRoute() {
    let routeId = this.activatedRoute.snapshot.params.id;
    this.routeService.getRoute(routeId).subscribe(val => {
      this.route = val;
      this.image = environment.host + this.route.image_name;
      setTimeout((route: Route) => this.initializeMap(this.route), 500);
    });
  }

  private initializeMap(route: Route) {
    let coordinatesSplitted = route.coordinates.split(';');

    let startingCoordinates = coordinatesSplitted[0].split(',');
    let startingLat: number = +startingCoordinates[0];
    let startingLng: number = +startingCoordinates[1];
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [startingLat, startingLng],
      zoom: 13.5,
    });

    this.map.on('load', (e) => this.getDirections(e));
  }

  private getDirections(event: any) {
    this.mapboxService.getDirections(this.route.type, this.route.coordinates).subscribe(val => {
      this.addRoute(val.routes[0].geometry);
      let data = val.routes[0].legs[0].steps;
      data.forEach((step: any) => {
        this.instructions.push(step.maneuver.instruction);
      });
    });
  }

  private addRoute(coords: any) {
    if (this.map.getSource('route')) {
      this.map.removeLayer('route')
      this.map.removeSource('route')
    }
    this.addRouteLayer(coords);
  }

  private addRouteLayer(coords: any) {
    this.map.addLayer({
      "id": "route",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "Feature",
          "properties": {},
          "geometry": coords
        }
      },
      "layout": {
        "line-join": "round",
        "line-cap": "round"
      },
      "paint": {
        "line-color": "#3b9ddd",
        "line-width": 8,
        "line-opacity": 1
      }
    });
  }

}
