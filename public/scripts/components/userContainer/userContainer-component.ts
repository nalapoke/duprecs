import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../services/user-service';
import { IUser } from '../../models/user';
import { IReleaseCollection } from '../../models/releaseCollection';
import { IRelease } from '../../models/release';
import { IArtist } from '../../models/artist';
import { SortType } from '../../models/sortType';
import { SortOrderType } from '../../models/sortOrderType';
import { ReleaseCollectionType } from '../../models/releaseCollectionType';

@Component({
  templateUrl: 'scripts/components/userContainer/userContainer.html'
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
    private _route: ActivatedRoute) {
    this._userCollection = <IReleaseCollection>{
      type: ReleaseCollectionType.collection,
      fetching: true,
      errorMessage: '',
      collection: []
    };
    this._userWantlist = <IReleaseCollection>{
      type: ReleaseCollectionType.wantlist,
      fetching: true,
      errorMessage: '',
      collection: []
    };
    this.currentReleaseCollection = this._userCollection;
    this.currentSortType = SortType.artist;
    this.currentSortOrderType = SortOrderType.asc;
  }

  ngOnInit(): void {
    this._route.queryParams.map(params => params['username'])
        .subscribe(value => { this.username = value; });
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

  //TODO: Look at using flatMap/switchMap in the user-service to avoid forkJoin here.
  getUserCollection(): void {
    this._userCollectionSubscription = Observable.forkJoin(
      this._userService.getAllUserCollectionReleases(
        this.username,
        this.user.num_collection,
        this.currentSortType,
        this.currentSortOrderType)
    ).subscribe(
      (releaseGroups: Array<Array<IRelease>>) => {
        let collectionReleases: Array<IRelease> = [].concat.apply([], releaseGroups);
        this._userCollection.collection = formatCollectionData(collectionReleases);
        this._userCollection.fetching = false;
      },
      () => {
        this._userCollection.errorMessage =
          'Unable to fetch ' + this.username + '\'s collection. Please ensure user has a public collection and try again.'
        this._userCollection.fetching = false;
      });
  }

  getUserWantlist(): void {
    this._userWantlistSubscription = Observable.forkJoin(
      this._userService.getAllUserWantlistReleases(
        this.username,
        this.user.num_wantlist,
        this.currentSortType,
        this.currentSortOrderType)
    ).subscribe(
      (releaseGroups: Array<Array<IRelease>>) => {
        let wantlistReleases: Array<IRelease> = [].concat.apply([], releaseGroups);
        this._userWantlist.collection = formatCollectionData(wantlistReleases);
        this._userWantlist.fetching = false;
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
