import { IPagination } from './pagination';
import { IRelease } from './release';

export interface IUserWantlist {
  pagination: IPagination
  wants: IRelease[]
}
