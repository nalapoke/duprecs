import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserCollectionComponent } from './userCollection/userCollection.component';

@Component({
  selector: 'dr-app',
  templateUrl: 'scripts/app.html',
  directives: [NavbarComponent, ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/user/:username', name: 'UserCollection', component: UserCollectionComponent },
  { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {

}
