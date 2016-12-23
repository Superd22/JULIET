import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Count',
})
export class CountPipe implements PipeTransform {

  transform(value: any, args?: any): any {
      args.count = value.length;
      return value;
  }

}
