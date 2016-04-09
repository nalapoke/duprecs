import { Component } from 'angular2/core';

@Component({
  selector: 'dr-navbar',
  templateUrl: 'scripts/navbar/navbar.html'
})
export class NavbarComponent {
  public brandName: string = "Duprecs";
}