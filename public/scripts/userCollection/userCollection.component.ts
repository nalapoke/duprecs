import { Component, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { UserService } from './user.service';
import { ReleaseFilterPipe } from './releaseFilter.pipe'
import { IUser } from './interfaces/user';
import { IUserCollection } from './interfaces/userCollection';
import { IRelease } from './interfaces/release';

@Component({
  templateUrl: 'scripts/userCollection/userCollection.html',
  pipes: [ReleaseFilterPipe]
})
export class UserCollectionComponent implements OnInit{
  private _pageNumber: number = 1;

  username: string;
  user: IUser;
  userCollection: IRelease[] = [];
  userError: string;
  userCollectionError: string;

  constructor(
    private _userService: UserService,
    routeParams: RouteParams) {
    this.username = routeParams.get('username');
  }

  ngOnInit(): void {
    this._userService.getUser(this.username)
      .subscribe(
        (user: IUser) => {
          this.user = user;
          this.getUserCollection();
        },
        () => this.userError =
          'Unable to find a Discogs user matching the username \'' + this.username + '\'.');
  }

  getUserCollection(): void {
    this._userService.getUserCollection(this.username, this._pageNumber)
      .subscribe(
        (userCollection: IUserCollection) => {
          this.userCollection = this.userCollection.concat(userCollection.releases);
          if (this._pageNumber < userCollection.pagination.pages) {
            this._pageNumber++;
            this.getUserCollection();
          }
        },
        () => this.userCollectionError =
          'Unable to fetch a collection for Discogs user \'' + this.username + '\'. Please try again.');
  }
}
