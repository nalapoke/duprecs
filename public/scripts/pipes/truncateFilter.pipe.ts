import { PipeTransform, Pipe } from 'angular2/core';

@Pipe ({
  name: 'truncateFilter'
})
export class TruncateFilterPipe implements PipeTransform {
  transform(value: string, args: number[]): string {
    if(!args[0]) {
      return value;
    }

    return (value.length > args[0]) ? value.substring(0,args[0] - 3) + '...' : value;
  }
}
