import { ShipModel } from './../interfaces/ship-model';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shipModelWithoutParent'
})

export class ShipModelWithoutParentPipe implements PipeTransform {

  transform(ships: ShipModel[], args?: any): ShipModel[] {
    return ships.filter((model) => model.parent == 0);
  }

}
