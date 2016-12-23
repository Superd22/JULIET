import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumKeys'
})
export class EnumKeysPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10);
      if (!isNaN(isValueProperty)) {
        keys.push({ key: enumMember, value: value[enumMember] });
      }
    }
    return keys;
  }

}
