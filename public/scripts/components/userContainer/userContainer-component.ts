import { Component, OnInit, OnDestroy } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { Subscription } from 'rxjs/Subscription';

import { UserService } from '../../services/user-service';
import { ReleaseListComponent } from './releaseList/releaseList-component';
import { IUser } from '../../models/user';
import { IReleaseCollection } from '../../models/releaseCollection';
import { IUserCollection } from '../../models/userCollection';
import { IUserWantlist } from "../../models/userWantlist";
import { IRelease } from '../../models/release';
import { IArtist } from '../../models/artist';
import { SortType } from '../../models/sortType';
import { SortOrderType } from '../../models/sortOrderType';
import { ReleaseCollectionType } from '../../models/releaseCollectionType';

@Component({
  templateUrl: 'scripts/components/userContainer/userContainer.html',
  directives: [ReleaseListComponent]
})
export class UserContainerComponent implements OnInit, OnDestroy{
  private _userSubscription: Subscription;
  private _userCollectionSubscription: Subscription;
  private _userWantlistSubscription: Subscription;
  private _userCollection: IReleaseCollection;
  private _userWantlist: IReleaseCollection;

  username: string;
  user: IUser;
  userError: string;

  currentReleaseCollection: IReleaseCollection;
  currentSortType: SortType;
  currentSortOrderType: SortOrderType;

  releaseCollectionTypes = ReleaseCollectionType;

  constructor(
    private _userService: UserService,
    routeParams: RouteParams) {
    this.username = routeParams.get('username');
    this._userCollection = <IReleaseCollection>{
      type: ReleaseCollectionType.collection,
      fetching: true,
      errorMessage: '',
      currentPageNumber: 1,
      collection: []
    };
    this._userWantlist = <IReleaseCollection>{
      type: ReleaseCollectionType.wantlist,
      fetching: true,
      errorMessage: '',
      currentPageNumber: 1,
      collection: []
    };
    this.currentReleaseCollection = this._userCollection;
    this.currentSortType = SortType.artist;
    this.currentSortOrderType = SortOrderType.asc;
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

    if (this._userWantlistSubscription) {
      this._userWantlistSubscription.unsubscribe();
    }
  }

  getUser(): void {
    this._userSubscription = this._userService.getUser(this.username)
      .subscribe(
        (user: IUser) => {
          this.user = user;
          this.getUserCollection();
          this.getUserWantlist();
        },
        () => this.userError =
          'Unable to find a Discogs user matching the username \'' + this.username + '\'.');
  }

  getUserCollection(): void {
    this._userCollectionSubscription = this._userService.getUserCollection(
      this.username,
      this._userCollection.currentPageNumber,
      this.currentSortType,
      this.currentSortOrderType)
        .subscribe(
          (userCollection: IUserCollection) => {
            let formattedCollectionData = formatCollectionData(userCollection.releases);
            this._userCollection.collection = this._userCollection.collection.concat(formattedCollectionData);
            if (this._userCollection.currentPageNumber < userCollection.pagination.pages) {
              this._userCollection.currentPageNumber++;
              this.getUserCollection();
            } else {
              this._userCollection.fetching = false;
            }
          },
          () => {
            this._userCollection.errorMessage =
              'Unable to fetch ' + this.username + '\'s collection. Please ensure user has a public collection and try again.'
            this._userCollection.fetching = false;
          });
  }

  getUserWantlist(): void {
    this._userWantlistSubscription = this._userService.getUserWantlist(
      this.username,
      this._userWantlist.currentPageNumber,
      this.currentSortType,
      this.currentSortOrderType)
        .subscribe(
          (wantlist: IUserWantlist) => {
            let formattedWantlistData = formatCollectionData(wantlist.wants);
            this._userWantlist.collection = this._userWantlist.collection.concat(formattedWantlistData);
            if (this._userWantlist.currentPageNumber < wantlist.pagination.pages) {
              this._userWantlist.currentPageNumber++;
              this.getUserWantlist();
            } else {
              this._userWantlist.fetching = false;
            }
          },
          () => {
            this._userWantlist.errorMessage =
              'Unable to fetch ' + this.username + '\'s wishlist. Please try again.'
            this._userWantlist.fetching = false;
          });
  }

  onReleaseCollectionTypeChange(releaseCollectionTypeSelected: ReleaseCollectionType): void {
    if (this.currentReleaseCollection.type !== releaseCollectionTypeSelected) {
      this.currentReleaseCollection = releaseCollectionTypeSelected === ReleaseCollectionType.collection ?
        this._userCollection :
        this._userWantlist;
    }
  }
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
