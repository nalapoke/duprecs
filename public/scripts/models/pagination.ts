import { IPaginationUrls } from './paginationUrls';

export interface IPagination {
  per_page: number,
  items: number,
  page: number,
  urls: IPaginationUrls,
  pages: number
}
