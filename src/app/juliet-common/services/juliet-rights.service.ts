import { Observable } from 'rxjs/Observable';
import { JulietAPIService } from './juliet-api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class JulietRightsService {

  public userIsAuthorized: Boolean = false;
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
        }

        return data;
      }
    );
  }

}
