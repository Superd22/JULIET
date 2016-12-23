import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'Filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    if (value) {
      for (var obj of value) {
        var add = true;
        for (var pp in args) {
          if (typeof args[pp] == "undefined" || args[pp] === null) continue;
          else if(typeof args[pp] == "string" && typeof obj[pp] == "string" && obj[pp].toLowerCase().indexOf(args[pp].toLowerCase()) > -1) add = true;
          else if(obj[pp] == args[pp]) add = true;
          else {
            add = false;
            break;
          }
        }
        if(add) keys.push(obj);
      }
    }
    return keys;
  }

}
