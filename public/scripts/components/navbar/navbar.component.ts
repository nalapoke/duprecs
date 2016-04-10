import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';

@Component({
  selector: 'dr-navbar',
  templateUrl: 'scripts/components/navbar/navbar.html',
  directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {
  public brandName: string = "Duprecs";
}