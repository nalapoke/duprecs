import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import 'rxjs/Rx';   // Load all features

import { NavbarComponent } from '../navbar/navbar-component';
import { HomeComponent } from '../home/home-component';
import { UserContainerComponent } from '../userContainer/userContainer-component';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'dr-app',
  templateUrl: 'scripts/components/appContainer/appContainer.html',
  directives: [NavbarComponent, ROUTER_DIRECTIVES],
  providers: [UserService]
})
@RouteConfig([
  { path: '/', name: 'Home', component: HomeComponent, useAsDefault: true },
  { path: '/user/:username', name: 'User', component: UserContainerComponent },
  { path: '/**', redirectTo: ['Home'] }
])
export class AppComponent {

}
