import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phpToJsTimeStamp'
})
export class PhpToJsTimeStampPipe implements PipeTransform {

  transform(value:number, reverse?:boolean):number {
    if(!reverse) return Number(value*1000);
    else return Number(value/1000);
  }

}
