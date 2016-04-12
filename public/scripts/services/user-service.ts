import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { IUser } from '../models/user';
import { IUserCollection } from '../models/userCollection';
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

  getUserCollection(username: string, page: number, sortType: SortType, sortOrderType: SortOrderType): Observable<IUserCollection> {
    return this._http.get(this._userUrl + username + '/collection/folders/0/releases?&per_page=50&page='
      + page + '&sort=' + SortType[sortType] + '&sort_order=' + SortOrderType[sortOrderType])
        .map((response: Response) => <IUserCollection>response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
