import { PipeTransform, Pipe } from '@angular/core';
import { IRelease } from '../models/release';
import { IArtist } from '../models/artist';

@Pipe({
  name: 'releaseFilter'
})
export class ReleaseFilterPipe implements PipeTransform {

  transform(value: IRelease[], args: string[]): IRelease[] {
    if (!args[0]) {
      return value;
    }
    return value.filter((release: IRelease) =>
      this.titleContainsMatch(release.basic_information.title, args[0]) ||
      this.artistsContainsMatch(release.basic_information.artists, args[0]));
  }

  private titleContainsMatch(title: string, expression: string): boolean {
    return this.stringContainsExpression(title, expression);
  }

  private artistsContainsMatch(artistsArr: IArtist[], expression: string): boolean {
    let matches = artistsArr.filter((artist: IArtist) =>
      this.stringContainsExpression(artist.name, expression));
    return matches.length > 0;
  }

  private stringContainsExpression(str: string, expression: string): boolean {
    return str.toLocaleLowerCase().includes(expression.toLocaleLowerCase());
  }
}
