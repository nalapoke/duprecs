import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

@Component({
  templateUrl: 'scripts/components/home/home.html'
})
export class HomeComponent {
  public searchUsername: string = "";

  constructor(private _router: Router){

  }

  goToUserPage(): void {
    if (!this.searchUsername) return;
    this._router.navigate(['User', { username: this.searchUsername }]);
  }
}
