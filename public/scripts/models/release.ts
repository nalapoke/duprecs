import { IBasicInformation } from './basicInformation';

export interface IRelease {
  instance_id: number,
  date_added: string,
  basic_information: IBasicInformation,
  id: number,
  rating: number
}
