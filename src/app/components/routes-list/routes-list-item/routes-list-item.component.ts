import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Route } from 'src/app/models/route';
import { environment } from 'src/environments/environment';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RouteService } from 'src/app/services/route.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-routes-list-item',
  templateUrl: './routes-list-item.component.html',
  styleUrls: ['./routes-list-item.component.css']
})
export class RoutesListItemComponent implements OnInit {

  faTrash = faTrash;

  @Input() route: Route;
  @Output() refreshList = new EventEmitter();

  routeImage: string = 'http://placeimg.com/640/360/nature';
  isDeletable: boolean = false

  constructor(
    private authService: AuthenticationService,
    private routeService: RouteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.route.image_name != '') {
      this.routeImage = environment.host + this.route.image_name;
    }

    this.isDeletable = this.route.user.id == this.authService.currentUserValue?.id;
  }

  delete() {
    this.spinner.show();
    this.routeService.deleteRoute(this.route.id).subscribe(val => {
      this.toastr.success('Route deleted!');
      this.spinner.hide();
      this.refreshList.emit();
    });
  }

  navigateToRoute(routeId: String) {
    this.router.navigate(['/route/' + routeId]);
  }

}
