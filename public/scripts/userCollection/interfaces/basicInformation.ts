import { ILabel } from './label';
import { IFormat } from './format';
import { IArtist } from './artist';

export interface IBasicInformation {
  labels: ILabel[],
  formats: IFormat[],
  thumb: string,
  title: string,
  artists: IArtist[],
  resource_url: string,
  year: number,
  id: number
}
