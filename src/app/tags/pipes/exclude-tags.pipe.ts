import { Pipe, PipeTransform } from '@angular/core';
import { ATag } from '../interfaces/a-tag';

@Pipe({
  name: 'ExcludeTags',
  pure: false,
})
export class ExcludeTagsPipe implements PipeTransform {

  transform(tags: ATag[], excludes: ATag[]): any {
    let keys = [];

    var excludeIds = []; 
    var excludeTypes = []; 

      // Create pseudo hash-map of ids/cats
      excludes.map(function(exclude) {
        excludeIds.push(exclude.id);
        excludeTypes.push(exclude.cat);
      });

    // Filter by id
    keys = tags.filter( tag => {

      // Return if we have nothing to filter
      if(excludeIds.length == 0) return true;

      // Check if current tag is in exclude list
      let id = excludeIds.indexOf(tag.id);
      // If is in exclude list and has the same cat then splice the hashmap
      if(id > 0 && excludeTypes[id] == tag.cat) {
        excludeIds.splice(id, 1);
        excludeTypes.splice(id, 1);
        return false;
      }
      return true;
    });

    return keys; 
  }

}
