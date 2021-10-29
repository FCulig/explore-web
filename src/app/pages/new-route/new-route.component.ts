import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import { MapboxService } from 'src/app/services/mapbox.service';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.component.html',
  styleUrls: ['./new-route.component.css']
})
export class NewRouteComponent implements OnInit {

  private _routeType: any = "walking";

  isMapping = false;
  map: mapboxgl.Map;
  draw: MapboxDraw;
  coordinates: String;

  get routeType(): String {
    return this._routeType;
  }

  set routeType(newRouteType: String) {
    this._routeType = newRouteType;
    if (this.coordinates != "") {
      this.getDirections(this._routeType, this.coordinates);
    }
  }

  constructor(private mapboxService: MapboxService) { }

  ngOnInit(): void {
    this.initializeMap();
    this.bindDrawTool();
    this.bindCrudEvents();
  }

  saveRoute() {
    // TODO: POST Route details
  }

  setRouteType(routeType: String) {
    this.routeType = routeType;
    this.getDirections(this.routeType, this.coordinates);
  }

  private initializeMap() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [15.978665527720779, 45.804992062634966],
      zoom: 15.5,
    });
  }

  private bindCrudEvents() {
    this.map.on('draw.create', (e) => this.drawLine(e));
    this.map.on('draw.update', (e) => this.drawLine(e));
    this.map.on('draw.delete', (e) => this.removeRoute(e));
  }

  private drawLine(e: any) {
    this.removeRoute(e);
    this.coordinates = e.features[0].geometry.coordinates.join(';');

    this.getDirections(this.routeType, this.coordinates);
  }

  private getDirections(type: String, coordinates: String) {
    this.mapboxService.getDirections(type, coordinates).subscribe(val => {
      console.log(val);
      this.addRoute(val.routes[0].geometry);
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
        "line-opacity": 0.8
      }
    });
  }

  private removeRoute(e: any) {
    if (this.map.getSource('route')) {
      this.map.removeLayer('route');
      this.map.removeSource('route');
    }
  }

  private bindDrawTool() {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      styles: [
        {
          "id": "gl-draw-line",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"], ["!=", "mode", "static"]],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#3b9ddd",
            "line-dasharray": [0.2, 2],
            "line-width": 4,
            "line-opacity": 0.7
          }
        },
        {
          "id": "gl-draw-polygon-and-line-vertex-halo-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
          "paint": {
            "circle-radius": 10,
            "circle-color": "#FFF"
          }
        },
        {
          "id": "gl-draw-polygon-and-line-vertex-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"], ["==", "$type", "Point"], ["!=", "mode", "static"]],
          "paint": {
            "circle-radius": 6,
            "circle-color": "#3b9ddd",
          }
        },
      ]
    });
    this.map.addControl(this.draw);
  }

}
