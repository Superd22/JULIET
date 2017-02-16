import { Injectable } from '@angular/core';
import { JulietAPIService } from './juliet-api.service';
import { JuLightUser } from '../interfaces/ju-light-user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JulietUserNamesConverterService {

  protected _userArray:JuLightUser[] = [];
  protected _pendingIds:number[] = [];
  protected _latestTransaction:Observable<JuLightUser[]>;
  protected _notOkayIds = [];
  constructor(protected api:JulietAPIService) { }

  /**
   * Adds a user ID to the pool of userids to be fetched.
   * @param id the id to add to the pool.
   */
  public addId(id:number) {
    // Push only if we don't have the username.
    if(this.findIdInArray(id) < 0) this._pendingIds.push(id);
  }

  /**
   * Fetches all the IDs currently in the pool and tries to populate
   * UserArray.
   */
  public fetchIds() {

    var pending = this._pendingIds;

    if(pending.length > 0) {
      this._latestTransaction = this.api.get("Common/getUserById", {ids: pending}).map(
        data => {
          let users = data.data;

          for(var i=0;i<users.length;i++) {
            if(users[i]) {
              let user = users[i];
              let d = this.findIdInArray(user.id);
              // Update
              if(d >= 0) this._userArray[d] = user;
              // Insert
              else this._userArray.push(user);
            }

            return users;
          }
        }
      );
      this._latestTransaction.subscribe();
    }
    
    this._pendingIds = [];    
  }

  private findIdInArray(id:number) {
    return this._userArray.findIndex(function(user) {
      return user.id == id;
    });
  }

  /**
   * Returns the id match from userArray.
   * Will fetch pending ids if nothing is present.
   * @param id the requested id.
   */
  public getUserFromId(id:number):Observable<JuLightUser> {

    // Check already in array
    let index = this.findIdInArray(id);
    if(index >= 0) return Observable.of(this._userArray[index]);


    // Fetch ID
    this.fetchIds();

    return this._latestTransaction.map(
      () => {
          let index = this.findIdInArray(id);
          if(index >= 0) return this._userArray[index];
          return null;
      }
    )

  }

}
