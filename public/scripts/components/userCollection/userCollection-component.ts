import { Component, OnInit, OnDestroy } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../services/user-service';
import { GridViewComponent } from './gridView/gridView-component';
import { IUser } from '../../models/user';
import { IUserCollection } from '../../models/userCollection';
import { IRelease } from '../../models/release';
import { IArtist } from '../../models/artist';

@Component({
  templateUrl: 'scripts/components/userCollection/userCollection.html',
  directives: [GridViewComponent]
})
export class UserCollectionComponent implements OnInit, OnDestroy{
  private _pageNumber: number = 1;
  private _userSubscription: Subscription;
  private _userCollectionSubscription: Subscription;

  username: string;
  user: IUser;
  userCollection: IRelease[] = [];
  userError: string;
  userCollectionError: string;
  viewTypes = ViewType;
  currentViewType: ViewType;

  constructor(
    private _userService: UserService,
    routeParams: RouteParams) {
    this.username = routeParams.get('username');
    this.currentViewType = ViewType.Grid;
  }

  ngOnInit(): void {
    this.getUser();
  }

  ngOnDestroy(): void {
    if (this._userSubscription) {
      this._userSubscription.unsubscribe();
    }

    if (this._userCollectionSubscription) {
      this._userCollectionSubscription.unsubscribe();
    }
  }

  getUser(): void {
    this._userSubscription = this._userService.getUser(this.username)
      .subscribe(
        (user: IUser) => {
          this.user = user;
          this.getUserCollection();
        },
        () => this.userError =
          'Unable to find a Discogs user matching the username \'' + this.username + '\'.');
  }

  getUserCollection(): void {
    this._userCollectionSubscription = this._userService.getUserCollection(this.username, this._pageNumber)
      .subscribe(
        (userCollection: IUserCollection) => {
          let formattedCollectionData = formatCollectionData(userCollection.releases);
          this.userCollection = this.userCollection.concat(formattedCollectionData);
          if (this._pageNumber < userCollection.pagination.pages) {
            this._pageNumber++;
            this.getUserCollection();
          }
        },
        () => this.userCollectionError =
          'Unable to fetch a collection for Discogs user \'' + this.username + '\'. Please try again.');
  }

  onViewButtonClicked(viewTypeSelected: ViewType): void {
    if (this.currentViewType !== viewTypeSelected) {
      this.currentViewType = viewTypeSelected;
    }
  }
}

enum ViewType {
  Grid,
  List
}

function formatCollectionData(collectionData: IRelease[]): IRelease[] {
  return collectionData.map(formatReleaseData);
}

function formatReleaseData(release: IRelease): IRelease {
  release.basic_information.artists = release.basic_information.artists.map(formatArtistData);
  return release;
}

function formatArtistData(artist: IArtist): IArtist {
  artist.name = artist.name.replace(/^(.+)(\s\(\d+\))$/, '$1');
  return artist;
}
