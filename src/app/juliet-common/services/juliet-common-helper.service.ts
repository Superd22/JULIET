import { Injectable } from '@angular/core';

@Injectable()
export class JulietCommonHelperService {

  constructor() { }
  /**
   * Check two objects to see if they have the same properties and propertie value
   * Usually used for checking if an object was changed by the user.
   * @param a the first object
   * @param b the second object
   * @param properties an array of property name to be checked
   * @return true if same object, false if missing or mismatching pp
   */
  public hasChangedObj(a, b, properties):Boolean {
    if(!a || !b || !properties || properties.length == 0) return false;
    for(var i=0; i<properties.length; i++) {
      let pp = properties[i];
      if (a[pp] != b[pp]) return true;
    }
    return false;
  }
}
