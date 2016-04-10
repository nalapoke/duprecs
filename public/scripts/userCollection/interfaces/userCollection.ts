import { IPagination } from './pagination';
import { IRelease } from './release';

export interface IUserCollection {
  pagination: IPagination
  releases: IRelease[]
}
