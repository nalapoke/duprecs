import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { HTTP_PROVIDERS } from 'angular2/http';
import 'rxjs/Rx';   // Load all features

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { UserCollectionComponent } from './userCollection/userCollection.component';
import { UserService } from './userCollection/user.service';

@Component({
  selector: 'dr-app',
  templateUrl: 'scripts/app.html',
  directives: [NavbarComponent, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, UserService]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/user/:username', name: 'UserCollection', component: UserCollectionComponent },
  { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {

}
