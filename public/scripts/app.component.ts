import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'dr-app',
  templateUrl: 'scripts/app.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true }
])
export class AppComponent {

}
