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
      data => {
        if (!data.error) return data.data;
      }
    );
  }

  /**
   * Get all the existing ship types
   * @return an array of ship types as an observable
   */
  public getAllShipTypes(force?: boolean): Observable<ShipModel[]> {
    // If we're forcing or if don't have no data
    if (force || this.shipTypes.length == 0)
      return this.api.get(this.apiNamespace + "getAllShipTypes").map(
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

  public updateShip(ship: AShip): Observable<any> {
    return this.api.post(this.apiNamespace + "updateShip", { ship: ship }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }

  /**
   * Pushes a new/updated shipType to the db.
   * will execute an UPDATE if shipType
   */
  public updateShipType(shipType: ShipModel): Observable<ShipModel> {
    return this.api.post(this.apiNamespace + "adminShipType", { shipType: shipType }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }

  public deleteShipType(shipType: ShipModel): Observable<any> {
    return this.api.post(this.apiNamespace + "adminDeleteShipType", { shipTypeId: shipType.id }).map(
      data => {
        if (!data.error) return data.data;
      }
    );
  }


}