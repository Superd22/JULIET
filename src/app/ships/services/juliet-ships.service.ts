import { ShipModel } from './../interfaces/ship-model';
import { Hangar } from './../interfaces/hangar';
import { AUser } from './../../user/interfaces/a-user';
import { JulietAPIService } from './../../juliet-common/services/juliet-api.service';
import { Observable } from 'rxjs/Observable';
import { AShip } from './../interfaces/a-template';
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
  
  public getHangarOfPlayer(user: AUser): Observable<Hangar>;
  public getHangarOfPlayer(user_id: number): Observable<Hangar>;
  /**
   * Get the Hangar belonging to a player
   */
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
    if(force || this.shipTypes.length == 0) 
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



}
