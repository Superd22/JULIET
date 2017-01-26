import { JulietAPIService } from './juliet-api.service';
import { CompleterData, CompleterService } from 'ng2-completer';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietCommonHelperService {

  constructor(private completerService: CompleterService, private api: JulietAPIService) { }
  /**
   * Check two objects to see if they have the same properties and propertie value
   * Usually used for checking if an object was changed by the user.
   * @param a the first object
   * @param b the second object
   * @param properties an array of property name to be checked
   * @return true if same object, false if missing or mismatching pp
   */
  public hasChangedObj(a, b, properties): Boolean {
    if (!a || !b || !properties || properties.length == 0) return false;
    for (var i = 0; i < properties.length; i++) {
      let pp = properties[i];
      if (a[pp] != b[pp]) return true;
    }
    return false;
  }

  /**
 * Builds a completerData to user with ng2-completer
 * @param name the property of the fetched object to display
 * @param url the url (without prefixed apiurl) to fetch the data from. term will be DIRECTLY appended
 * @param dataField the property of the response object containing the data. (defaults : data)
 * @return a new Completerdata
 */
  public buildCompleter(name: string, url: string, dataField: string = "data"): CompleterData {
    var completer = this.completerService.remote(null, name, name);
    completer.urlFormater(term => this.api.api + url + term);
    completer.dataField(dataField);

    return completer;
  }
}