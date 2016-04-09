import { Component } from 'angular2/core';

@Component({
  selector: 'dr-navbar',
  templateUrl: 'navbar/navbar.html'
})
export class NavbarComponent {
  public brandName: string = "Duprecs";
}