import { AShipTemplate } from './../interfaces/a-template';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AShip } from './../interfaces/a-ship';
import { ShipModel } from './../interfaces/ship-model';
import { Hangar } from './../interfaces/hangar';
import { AUser } from './../../user/interfaces/a-user';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Subscription } from "rxjs/Subscription";

@Injectable()
/**
 * Main service for getting/updating ships
 * 
 */
export class JulietShipsService {

  /** our namespace */
  private apiNamespace = "Ships/";
  /** all the ship types that exists */
  private shipTypes: ShipModel[] = [];
  /** the currently selected ship in any view */
  private selectedShip: AShip = null;
  /** our cache of ships */
  private _shipsCache: Map<number, ReplaySubject<AShip>> = new Map<number, ReplaySubject<AShip>>();
  /** our cache of templates */
  private _shipTemplatesCache: Map<number, ReplaySubject<AShipTemplate>> = new Map<number, ReplaySubject<AShipTemplate>>();


  constructor(private api: JulietAPIService) { }


  /** @param ship the ship to fetch data for */
  public getSingleShip(ship: AShip);
  /** @param id the id of the shig to fetch data for */
  public getSingleShip(id: number);
  /** Fetch data about a single ship */
  public getSingleShip(ship) {
    /*return this.api.get(this.apiNamespace + "").subscribe(
      data => 
    );*/
  }

  /**
   * Get the Hangar belonging to a player
   */
  public getHangarOfPlayer(user: AUser): Observable<Hangar>;
  public getHangarOfPlayer(user_id: number): Observable<Hangar>;
  public getHangarOfPlayer(user): Observable<Hangar> {
    if (typeof user != typeof 123) user = user.id_forum;
    return this.api.get(this.apiNamespace + "getPlayerHangar", { user_id: user }).map(
      (data: { data: { ships: AShip[] }, error: boolean }) => {
        if (!data.error) {

          // Cache our ships
          data.data.ships.forEach((ship) => {
            this.cacheAShip(ship);
          });


          return data.data;
        }
      }
    );
  }

  /**
   * Cache a given ship in memory
   * @param ship the ship to cache
   */
  private cacheAShip(ship: AShip) {
    this.api.fetchAndCache(this._shipsCache, ship.id, false, Observable.of(ship));

    // Cache our templates (useful ?)
    if (ship.templates != null && ship.templates.length > 0) {
      ship.templates.forEach((shipTemplate) => {
        if (shipTemplate && shipTemplate.id > 0)
          this.api.fetchAndCache(this._shipTemplatesCache, shipTemplate.id, false, Observable.of(shipTemplate));
      });
    }

  }

  public getShipTemplate(shipTemplate: AShipTemplate, force?: boolean): ReplaySubject<AShipTemplate>;
  public getShipTemplate(shipTemplateId: number, force?: boolean): ReplaySubject<AShipTemplate>;
  public getShipTemplate(ship, force?: boolean): ReplaySubject<AShipTemplate> {
    let tId = null;
    if (typeof ship == typeof 123) tId = ship;
    else tId = ship.id;

    let call = this.api.get(this.apiNamespace + "getShipTemplate").map(
      (data) => data.data
    );

    return this.api.fetchAndCache(this._shipTemplatesCache, tId, force, call);
  }

  public getShip(ship: AShip, force?: boolean): ReplaySubject<AShip>;
  public getShip(shipId: number, force?: boolean): ReplaySubject<AShip>;
  public getShip(ship, force?: boolean): ReplaySubject<AShip> {
    let tId = null;
    if (typeof ship == typeof 123) tId = ship;
    else tId = ship.id;

    let call = this.api.get(this.apiNamespace + "getShip").map(
      (data) => data.data
    );

    return this.api.fetchAndCache(this._shipsCache, tId, force, call);

  }

  /**
   * Get all the existing ship types
   * @return an array of ship types as an observable
   */
  public getAllShipTypes(force?: boolean): Observable<ShipModel[]> {
    // If we're forcing or if don't have no data
    if (force || this.shipTypes.length == 0)
      return this.api.get(this.apiNamespace + "Model/getAll").map(
        data => {
          if (!data.error) {
            this.shipTypes = data.data;
            return this.shipTypes;
          }
        }
      );

    // Else just send our cached ship types
    return Observable.of(this.shipTypes);
  }

  /**
   * Get a map of all existing ship types
   * @param force force update or use cache
   * @return a map of all existing ship types
   */
  public getAllShipTypesMap(force?: boolean): Observable<Map<number, ShipModel>> {

    function mapify(arr: ShipModel[]): Map<number, ShipModel> {
      let map = new Map<number, ShipModel>();
      arr.forEach(ship => {
        map.set(ship.id, ship);
      });

      return map;
    }

    return this.getAllShipTypes(force).map(
      data => mapify(data)
    );

  }

  public getShipType(ship: AShip, force?: boolean): Observable<ShipModel>;
  public getShipType(id: number, force?: boolean): Observable<ShipModel>;
  public getShipType(id, force?: boolean): Observable<ShipModel> {
    if (typeof id != typeof 123) id = id.type_id;

    return this.getAllShipTypesMap(force).map((map) => map.get(id));
  }

  /**
   * Creates/register a new ship with back-end
   */
  public createNewShip(ship: ShipModel): Observable<AShip>;
  public createNewShip(ship_id: number): Observable<AShip>;
  public createNewShip(ship: ShipModel | number, user: AUser | number): Observable<AShip>;
  public createNewShip(ship, user?): Observable<AShip> {
    if (!user) user = 0;
    if (typeof ship != typeof 123) ship = ship.id;
    if (typeof user != typeof 123) user = user.id_forum;

    return this.api.get(this.apiNamespace + "registerNewPlayerShip", { user_id: user, type_id: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }

  public deleteShip(ship_id: number);
  public deleteShip(ship: AShip);
  public deleteShip(ship): Observable<any> {
    if (typeof ship != typeof 123) ship = ship.id;
    return this.api.get(this.apiNamespace + "deleteShip", { ship_id: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }

  public updateShip(ship: AShip): Observable<AShip> {
    return this.api.post(this.apiNamespace + "updateShip", { ship: ship }).map(
      data => {
        if (!data.error) {
          this.cacheAShip(ship);
          return data.data;
        }
        else return ship;
      }
    );
  }

  /**
   * Pushes a new/updated shipType to the db.
   * will execute an UPDATE if shipType
   */
  public updateShipType(shipType: ShipModel): Observable<ShipModel> {
    return this.api.post(this.apiNamespace + "Model/update", { shipType: shipType }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }

  public deleteShipType(shipType: ShipModel): Observable<any> {
    return this.api.post(this.apiNamespace + "Model/delete", { shipTypeId: shipType.id }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }


  /**
   * Updates the given ship template in the db
   * will perform an ADD operation if shipTemplate.id == 0
   * @param shipTemplate the template to update
   * @return the newly updated/inserted template
   */
  public updateShipTemplate(shipTemplate: AShipTemplate): Observable<AShipTemplate> {
    return this.api.post(this.apiNamespace + "Template/update", { shipTemplate: shipTemplate }).map(
      data => {
        if (!data.error) {
          this.updateShipTemplateCache(shipTemplate);
          return data.data;
        }
        else return null;
      }
    );
  }

  /**
   * Updates the cache for this given ship template
   * @param shipTemplate 
   */
  public updateShipTemplateCache(shipTemplate: AShipTemplate) {
      this.api.fetchAndCache(this._shipTemplatesCache, shipTemplate.id, false, Observable.of(shipTemplate));
  }

  /**
   * Delete the given ship template in the db
   * @param shipTemplate the template to delete
   * @return true on success
   */
  public deleteShipTemplate(shipTemplate: AShipTemplate): Observable<boolean> {
    return this.api.post(this.apiNamespace + "Template/delete", { shipTemplate: shipTemplate }).map(
      data => {
        if (!data.error) return data.data;
        else return null;
      }
    );
  }
}
