import { IRelease } from './release';
import { ReleaseCollectionType } from './releaseCollectionType';

export interface IReleaseCollection {
  type: ReleaseCollectionType,
  fetching: boolean,
  errorMessage: string,
  currentPageNumber: number,
  collection: IRelease[]
}
