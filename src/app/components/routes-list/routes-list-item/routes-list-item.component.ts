import { Component, Input, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';

@Component({
  selector: 'app-routes-list-item',
  templateUrl: './routes-list-item.component.html',
  styleUrls: ['./routes-list-item.component.css']
})
export class RoutesListItemComponent implements OnInit {

  @Input() route: Route;

  constructor() { }

  ngOnInit(): void { }

}
