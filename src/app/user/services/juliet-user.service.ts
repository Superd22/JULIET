import { BaseUserInfo } from './../interfaces/base-user-info';
import { AUserExtended } from './../interfaces/a-user-extended';
import { Injectable } from '@angular/core';
import { JulietAPIService } from '../../juliet-common/services/juliet-api.service';
import { AUser } from '../interfaces/a-user';
import { Observable } from 'rxjs/Observable';
import { JuWing } from '../enums/ju-wing.enum';

@Injectable()
export class JulietUserService {

  protected _namespace = "Users/";
  protected _rankNameSpace = "Ranks/";
  protected _currentUser: AUser = null;

  constructor(protected api: JulietAPIService) { }

  public getUserFiche(userid?: Number): Observable<AUserExtended> {
    if (!userid) userid = 0;

    return this.api.get(this._namespace + "GET_USER_FICHE", { id: userid }).map(
      data => data.data
    );

  }

  public getUserInfo(userid?: Number): Observable<AUser> {
    if (!userid) userid = 0;

    return this.api.get(this._namespace + "GET_USER_INFO", { id: userid }).map(
      data => data.data
    );

  }

  // Fetches the list of ranks for the given fleet
  public fetchRanksOfFleet(fleetId: JuWing, stars?: Number) {
    return this.api.get(this._rankNameSpace + "GET_FLEET_STAR", { fleet: fleetId, star: stars }).map(
      data => data.data
    );
  }

  /**
   * Current logged-in user
   * @return observable containing our logged in user.
   */
  public get currentUser(): Observable<AUser> {
    if (this._currentUser === null) {
      return this.api.get(this._namespace + "GET_USER_FICHE", { id: 0 }).map(
        data => {
          if (!data.error) {
            this._currentUser = data.data;
            return data.data;
          }
        }
      );
    }
    else return Observable.of(this._currentUser);
  }

  public getUsersNameById(user_ids: number[]): Observable<Map<number, BaseUserInfo>> {
    return this.api.get("Common/getUserById", { ids: user_ids }).map(
      (data) => {
        if (!data.error) {

          let mapa = new Map<number, BaseUserInfo>();

          data.data.forEach((user: BaseUserInfo) => {
            mapa.set(user.id, user);
          });

          return mapa;
        }
      });
  }

  public getUserNameFromId(user_id: number): Observable<BaseUserInfo> {
    return this.api.get("Common/getUserById", { ids: user_id }).map(
      data => {
        if (!data.error) {
          return data.data[0];
        }
      }
    )
  }

}
