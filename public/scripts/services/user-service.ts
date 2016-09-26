import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { IUser } from '../models/user';
import { IRelease } from '../models/release';
import { IUserCollection } from '../models/userCollection';
import { IUserWantlist } from '../models/userWantlist';
import { SortType } from '../models/sortType';
import { SortOrderType } from '../models/sortOrderType';

@Injectable()
export class UserService {
  private _userUrl = 'api/v1/users/';

  constructor(private _http: Http) { }

  getUser(username: string): Observable<IUser> {
    return this._http.get(this._userUrl + username)
      .map((response: Response) => <IUser>response.json())
      .catch(this.handleError);
  }

  //TODO: refactor the following four functions - lots of reused code

  getUserCollectionByPage(username: string, page: number, sortType: SortType, sortOrderType: SortOrderType): Observable<IUserCollection> {
    return this._http.get(this._userUrl + username + '/collection/folders/0/releases?per_page=50&page='
      + page + '&sort=' + SortType[sortType] + '&sort_order=' + SortOrderType[sortOrderType])
        .map((response: Response) => <IUserCollection>response.json())
        .catch(this.handleError);
  }

  getAllUserCollectionReleases(username: string, totalReleases: number, sortType: SortType, sortOrderType: SortOrderType): Array<Observable<Array<IRelease>>> {
    let observables: Array<Observable<Array<IRelease>>> = [];
    let pages: number = Math.ceil(totalReleases / 50);
    for (let pageNo = 1; pageNo <= pages; pageNo++) {
      observables.push(
        this._http.get(this._userUrl + username + '/collection/folders/0/releases?per_page=50&page='
            + pageNo + '&sort=' + SortType[sortType] + '&sort_order=' + SortOrderType[sortOrderType])
          .map((response: Response) => <Array<IRelease>>response.json().releases)
          .catch(this.handleError)
      );
    }
    return observables;
  }

  getUserWantlist(username: string, page: number, sortType: SortType, sortOrderType: SortOrderType): Observable<IUserWantlist> {
    return this._http.get(this._userUrl + username + '/wantlist?per_page=50&page='
      + page + '&sort=' + SortType[sortType] + '&sort_order=' + SortOrderType[sortOrderType])
        .map((response: Response) => <IUserWantlist>response.json())
        .catch(this.handleError);
  }

  getAllUserWantlistReleases(username: string, totalReleases: number, sortType: SortType, sortOrderType: SortOrderType): Array<Observable<Array<IRelease>>> {
    let observables: Array<Observable<Array<IRelease>>> = [];
    let pages: number = Math.ceil(totalReleases / 50);
    for (let pageNo = 1; pageNo <= pages; pageNo++) {
      observables.push(
        this._http.get(this._userUrl + username + '/wantlist?per_page=50&page='
            + pageNo + '&sort=' + SortType[sortType] + '&sort_order=' + SortOrderType[sortOrderType])
          .map((response: Response) => <Array<IRelease>>response.json().wants)
          .catch(this.handleError)
      );
    }
    return observables;
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
