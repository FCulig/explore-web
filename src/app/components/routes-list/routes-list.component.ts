import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  routes: Route[] = [];

  constructor(
    private routeService: RouteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRoutes()
  }

  navigateToRoute(routeId: String) {
    this.router.navigate(['/route/' + routeId]);
  }

  private getRoutes() {
    this.routeService.getRoutes().subscribe(routes => {
      this.routes = routes
    });
  }
}
