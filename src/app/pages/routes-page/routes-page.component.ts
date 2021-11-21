import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-routes-page',
  templateUrl: './routes-page.component.html',
  styleUrls: ['./routes-page.component.css']
})
export class RoutesPageComponent implements OnInit {

  routes: Route[]

  constructor(private routeSerive: RouteService) { }

  ngOnInit(): void {
    this.getRoutes();
  }

  private getRoutes() {
    this.routeSerive.getRoutes().subscribe(val=> {
      this.routes = val;
    });
  }

}
