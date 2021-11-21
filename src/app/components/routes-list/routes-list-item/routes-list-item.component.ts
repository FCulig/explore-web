import { Component, Input, OnInit } from '@angular/core';
import { Route } from 'src/app/models/route';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-routes-list-item',
  templateUrl: './routes-list-item.component.html',
  styleUrls: ['./routes-list-item.component.css']
})
export class RoutesListItemComponent implements OnInit {

  @Input() route: Route;
  routeImage: string = 'http://placeimg.com/640/360/nature';

  constructor() { }

  ngOnInit(): void {
    if (this.route.image_name != '') {
      this.routeImage = environment.host + this.route.image_name;
    }
  }

}
