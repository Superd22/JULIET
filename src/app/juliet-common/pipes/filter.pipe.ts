import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    console.log(value);
    console.log(args);
    if (value) {
      for (var obj of value) {
        for (var pp in args) {
          if (typeof args[pp] == "undefined" || args[pp] === null) keys.push(obj);
          else if(typeof args[pp] == "string" && typeof obj[pp] == "string" && obj[pp].toLowerCase().indexOf(args[pp].toLowerCase()) > -1) keys.push(obj);
          else if(obj[pp] === args[pp]) keys.push(obj);
        }
      }
    }
    return keys;
  }

}
