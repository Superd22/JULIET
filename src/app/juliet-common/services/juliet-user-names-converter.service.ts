import { Injectable } from '@angular/core';
import { JulietAPIService } from './juliet-api.service';
import { JuLightUser } from '../interfaces/ju-light-user';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class JulietUserNamesConverterService {

  protected _userHash={};
  protected _pendingIds:number[] = [];
  constructor(protected api:JulietAPIService) { }

  /**
   * Adds a user ID to the pool of userids to be fetched.
   * @param id the id to add to the pool.
   */
  public addId(id:number) {
    this._userHash[id] = this._userHash[id] || new ReplaySubject(1);
    if(this._pendingIds.indexOf(id) == -1) this._pendingIds.push(id);
  }

  /**
   * Fetches all the IDs currently in the pool and tries to populate
   * UserArray.
   */
  public fetchIds() {
    if(this._pendingIds.length > 0) {

      // Initiliaze.
      this._pendingIds.forEach(
        id => {
          this._userHash[id] = this._userHash[id] || new ReplaySubject(1);
        }
      )

      this.api.get("Common/getUserById", {ids: this._pendingIds}).subscribe(
        data => {
          let users = data.data;

          for(var i=0;i<users.length;i++) {
              let user = users[i];
              this._userHash[user.id].next(user);
          }
          return users;
          }
      );
    }
    // Flush pendings.
    this._pendingIds = [];    
  }

  /**
   * Returns the id match from userArray.
   * Will fetch pending ids if nothing is present.
   * @param id the requested id.
   * @return The JuLightUser as a ReplaySubject
   */
  public getUserFromId(id:number):ReplaySubject<JuLightUser> {
    if(!this._userHash[id]) {
      this.addId(id);
      this.fetchIds();
    }
    return this._userHash[id];
  }

  public getUsersHash() {
    return this._userHash;
  }
}
