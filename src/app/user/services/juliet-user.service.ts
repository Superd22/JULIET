import { ReplaySubject } from 'rxjs/ReplaySubject';
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
  protected _userNameCache: Map<number, ReplaySubject<BaseUserInfo>> = new Map<number, ReplaySubject<BaseUserInfo>>();

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

  public getUserNameFromId(user_ids: number[], asObs?: boolean): Map<number, ReplaySubject<BaseUserInfo>>;
  public getUserNameFromId(user_id: number, asObs?: boolean): Observable<BaseUserInfo>;
  public getUserNameFromId(user, asObs) {
    let returnWholeMap = false;
    console.log(user);
    let call = this.api.get("Common/getUserById", { ids: user }).map(
      data => {
        if (!data.error) {
          /** Update our cache */
          data.data.forEach((user: BaseUserInfo) => {
            this._userNameCache.get(user.id).next(user);
          });

        }
      }
    );

    let cacheHasNot = (user_id: number) => {
      if (this._userNameCache.has(user_id)) return false;
      this._userNameCache.set(user_id, new ReplaySubject<BaseUserInfo>(1));
      return true;
    }
    console.log(typeof user);
    if (!(typeof user == typeof 123)) {
      returnWholeMap = true;
      for (let i = 0; i < user.length; i++) {
        if (cacheHasNot(user[i])) {
          call.subscribe();
          break;
        }
      }
    }
    else if (cacheHasNot(user)) {
      call.subscribe();
    }
    if (returnWholeMap) return this._userNameCache;
    else {
      if (asObs) return this._userNameCache.get(user).asObservable();
      else return this._userNameCache.get(user);
    }
  }


  /**
   * Helper function to search for a user by its username (on the forum)
   * @param search the username to look for
   * @return observable of the results
   * @todo convert to common cache with _userNameCache
   */
  public searchUserByName(search: string): Observable<BaseUserInfo[]> {
    if (search == null || search.length < 1) return Observable.of([]);
    return this.api.get('Common/UserSearch/', { f: search }).map(
      data => {
        if (!data.error) return data.data;
      }
    )
  }

}
