import { UIRouter, Transition } from '@uirouter/angular';
import { JulietAPIService } from './juliet-api.service';
import { CompleterData, CompleterService } from 'ng2-completer';
import { Injectable } from '@angular/core';
import { MdSidenav } from '@angular/material';

@Injectable()
export class JulietCommonHelperService {

  protected sideNav: MdSidenav;
  /** if we need to display tuto tooltips */
  private _tutorialMod: boolean = false;
  private _latestTransition: Transition[] = [];

  constructor(private completerService: CompleterService, private api: JulietAPIService, private router: UIRouter) {
    router.transitionService.onEnter({ to: "**" }, (call) => {
    
    })
  }


  /**
   * A sorted stack of the 10 last transitions
   */
  public get transitionHistory(): Transition[] {
    return this._latestTransition;
  }

  /**
   * Get the nth-last transition in our history
   * Currently limited to n < 10
   * @param n 
   */
  public getNLatestTransition(n: number): Transition {
    if (n >= 10) throw "LatestTransition only contains the 10 last transitions.";
    return this._latestTransition.length >= n ? this._latestTransition[n] : null;
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

  /**
  * Closes the main sidenav  
  */
  public closeSideNav() {
    if (this.sideNav) this.sideNav.close();
  }

  public toggleSideNav() {
    if (this.sideNav) this.sideNav.toggle();
  }

  public openSideNav() {
    if (this.sideNav) this.sideNav.open();
  }

  /**
   * Registers the main side-nav app-wide.
   */
  public registerSideNav(sidenav: MdSidenav) {
    this.sideNav = sidenav;
  }

}
