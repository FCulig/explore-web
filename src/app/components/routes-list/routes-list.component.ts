import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.css']
})
export class RoutesListComponent implements OnInit {

  @Input() routes: Route[] = [];
  @Output() refreshList = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  refreshRoutes() {
    this.refreshList.emit();
  }
}
