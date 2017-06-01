import { TagTarget } from './../interfaces/tag-target';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'targetListFilter',
  pure: false,
})
export class TargetListFilterPipe implements PipeTransform {

  private filters: {
    name: string,
    type: any
  } = { name: null, type: null };

  transform(targets: TagTarget[], name?: string, type?: string | string[]): TagTarget[] {
    this.filters.name = name;
    this.filters.type = type;

    return targets.filter((target) => {
      return this.filterByName(target) && this.filterByType(target);
    });

  }

  private filterByName(target: TagTarget): boolean {
    if (this.filters.name != null) return target.name.toLowerCase().indexOf(this.filters.name.toLowerCase()) > -1;
    return true;
  }

  private filterByType(target: TagTarget): boolean {
    if (this.filters.type != null) {
      // we want only one type
      if (typeof this.filters.type == typeof "string") return target.type.toLowerCase() == this.filters.type.toLowerCase();
      // We want any of the types in our array
      else {
        let found = false;
        for (let i = 0; i < this.filters.type.length; i++) {
          if (target.type.toLowerCase() == this.filters.type[i].toLowerCase()) {
            found = true;
            break;
          }
        }

        return found;
      }
    }
    return true;
  }

}
