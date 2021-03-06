import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import { UIRouter, Transition } from '@uirouter/angular';
import { JulietAPIService } from './juliet-api.service';
import { CompleterData, CompleterService } from 'ng2-completer';
import { Injectable } from '@angular/core';
import { MdSidenav } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Injectable()
export class JulietCommonHelperService {

  protected _sideNav: MdSidenav;
  public get sidenav(): MdSidenav { return this._sideNav; }
  /** if we need to display tuto tooltips */
  private _tutorialMod: boolean = false;

  constructor(private completerService: CompleterService, private api: JulietAPIService) {
  }

  /**
   * Check two objects to see if they have the same properties and propertie value
   * Usually used for checking if an object was changed by the user.
   * @param a the first object
   * @param b the second object
   * @param properties an array of property name to be checked
   * @return true if same object, false if missing or mismatching pp
   */
  public hasChangedObj(a, b, properties: string[]): Boolean {
    if (!a || !b || !properties || properties.length == 0) return false;
    for (var i = 0; i < properties.length; i++) {
      let pp = properties[i];
      if (a[pp] != b[pp]) return true;
    }
    return false;
  }

  /**
   * @see _tutorialMod
   * @return true for template mode, false otherwise.
   */
  public get isTutorial(): boolean {
    return this._tutorialMod;
  }

  /**
   * @param tutorial new value for tutorial mod
   */
  public set isTutorial(tutorial: boolean) {
    this._tutorialMod = tutorial;
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

  public static buildDataSourceFrom<T>(observable: Observable<T[]>): DataSource<T> {
    return new class extends DataSource<T> {
      constructor() {
        super();
      }
      connect(): Observable<T[]> {
        return observable;
      }
      disconnect() { }
    };
  }

  public static buildDataSourceFromFunction<T>(fn: () => Observable<T[]>): DataSource<T> {
    return JulietCommonHelperService.buildDataSourceFrom(fn());
  }

  /**
  * Closes the main sidenav  
  */
  public closeSideNav() {
    if (this._sideNav) this._sideNav.close();
  }

  public toggleSideNav() {
    if (this._sideNav) this._sideNav.toggle();
  }

  public openSideNav() {
    if (this._sideNav) this._sideNav.open();
  }

  /**
   * Registers the main side-nav app-wide.
   */
  public registerSideNav(sidenav: MdSidenav) {
    this._sideNav = sidenav;
  }

}
