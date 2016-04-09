import { Component } from 'angular2/core';
import { HTTP_PROVIDERS } from 'angular2/http';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import 'rxjs/Rx';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserCollectionComponent } from './userCollection/userCollection.component';

@Component({
  selector: 'dr-app',
  templateUrl: 'scripts/app.html',
  directives: [NavbarComponent, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/user/:id', name: 'UserCollection', component: UserCollectionComponent }
])
export class AppComponent {

}
