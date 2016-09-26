import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
