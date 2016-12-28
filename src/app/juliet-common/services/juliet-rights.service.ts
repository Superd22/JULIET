import { Observable } from 'rxjs/Observable';
import { JulietAPIService } from './juliet-api.service';
import { Injectable } from '@angular/core';
import { RemoteData } from 'ng2-completer';

@Injectable()
export class JulietRightsService {

  public userIsAuthorized: Boolean = false;
  public userIsAdmin: Boolean = false;
  private _authorizePacket;

  constructor(public api: JulietAPIService) { }

  public user_can(right: String, userId?: Number, target?: Number) {
    if (!userId) userId = 0;

    return this.api.get("Rights/" + right).map(
      data => data
    );
  }

  public can_see_juliet() {
    return this.userIsAuthorized === true ? Observable.of(this._authorizePacket) : this.user_can("USER_CAN_SEE_JULIET").map(
      data => {
        if (data.data === true) {
          console.log("setting okay");
          this.userIsAuthorized = true;
          this._authorizePacket = data;
          this.can_admin_juliet();
        }

        return data;
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
