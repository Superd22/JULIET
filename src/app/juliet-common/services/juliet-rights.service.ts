import { Observable } from 'rxjs/Observable';
import { JulietAPIService } from './juliet-api.service';
import { Injectable } from '@angular/core';
import { RemoteData } from 'ng2-completer';

@Injectable()
export class JulietRightsService {

  public userIsAuthorized: Boolean = false;
  public userIsAdmin: Boolean = false;
  public userId: Number = 0;
  private _authorizePacket;

  constructor(public api: JulietAPIService) { }

  public user_can(right: String, userId?: Number, target?: Number) {
    if (!userId) userId = 0;

    return this.api.get("Rights/" + right, {user_id: userId, target: target}).map(
      data => data
    );
  }

  public can_see_juliet() {
    return this.userIsAuthorized === true ? Observable.of(this._authorizePacket) : this.user_can("USER_CAN_SEE_JULIET").map(
      data => {
        if (data.data === true) {
          this.userIsAuthorized = true;
          this._authorizePacket = data;
          this.hydrateUserRights();
        }

        return data;
      }
    );
  }

  public hydrateUserRights() {
    this.user_can("HYDRATE_USER").subscribe(
      data => {
        if(data.data) {
          this.userId = data.data.userId;
          this.userIsAdmin = data.data.isAdmin;
        }
      }
    );
  }

  public can_admin_juliet() {
    this.userIsAdmin === true ? Observable.of(true) : this.user_can("USER_IS_ADMIN").subscribe(
      data => this.userIsAdmin = data.data
    );
  }

  public doLogin() {
    
  }

}
