import { Component } from 'angular2/core';
import { RouteParams } from 'angular2/router';

@Component({
  templateUrl: 'scripts/userCollection/userCollection.html'
})
export class UserCollectionComponent {
  public username: string;

  constructor(routeParams: RouteParams) {
    this.username = routeParams.get('username');
  }
}
