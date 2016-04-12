import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { IUser } from '../models/user';
import { IUserCollection } from '../models/userCollection';

@Injectable()
export class UserService {
  private _userUrl = 'api/v1/users/';

  constructor(private _http: Http) { }

  getUser(username: string): Observable<IUser> {
    return this._http.get(this._userUrl + username)
      .map((response: Response) => <IUser>response.json())
      .catch(this.handleError);
  }

  getUserCollection(username: string, page: number, sort: string, sortOrder: string): Observable<IUserCollection> {
    return this._http.get(this._userUrl + username + '/collection/folders/0/releases?&per_page=50&page='
      + page + '&sort=' + sort + '&sort_order=' + sortOrder)
        .map((response: Response) => <IUserCollection>response.json())
        .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }
}
