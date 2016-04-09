import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_PROVIDERS, RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';

import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'dr-app',
  templateUrl: './app.html',
  directives: [ROUTER_DIRECTIVES, NavbarComponent],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([

])
export class AppComponent {
  public mainText: string = "The app.";
}
