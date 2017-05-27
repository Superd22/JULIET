import { Observable } from 'rxjs/Observable';
import { JulietAPIService } from './juliet-api.service';
import { Injectable } from '@angular/core';
import { RemoteData } from 'ng2-completer';
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class JulietRightsService {

  public userIsAuthorized: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userIsAdmin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public userId: number = 0;
  private _authorizePacket: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(public api: JulietAPIService) {

    api.onErrorPacket.subscribe( (errorPacket) => {
      if(errorPacket !== null && errorPacket.error === true) {
        if(errorPacket.msg == "USER_NOT_LOGGED_IN") {
          this.userIsAuthorized.next(false);
          this._authorizePacket.next(errorPacket);
        }
      }
    })

  }

  public user_can(right: String, userId?: Number, target?: Number) {
    if (!userId) userId = 0;

    return this.api.get("Rights/" + right, { user_id: userId, target: target }).map(
      data => data
    );
  }

  public can_see_juliet(force?:boolean):BehaviorSubject<boolean> {

    if (this.userIsAuthorized.getValue() === false || force === true) {
       this.user_can("USER_CAN_SEE_JULIET").subscribe( (data) => {
        if(data.data === true) {
          this.userIsAuthorized.next(true);
          this._authorizePacket.next(data);
          this.hydrateUserRights();
        }
        else this.userIsAuthorized.next(false);
       });
    }

    return this.userIsAuthorized;

  }

  public get authorizePacket():BehaviorSubject<any> {
    return this._authorizePacket;
  }

  public set authorizePacket(authorizePacket) {
    this._authorizePacket.next(authorizePacket);
  }

  public hydrateUserRights() {
    this.user_can("HYDRATE_USER").subscribe(
      data => {
        if (data.data) {
          this.userId = data.data.userId;
          this.userIsAdmin = data.data.isAdmin;
        }
      }
    );
  }

  /**
   * Check if the current user is an admin
   * @param force force update
   * @return a BehaviorSubject, true = admin | false = non admin.
   */
  public can_admin_juliet(force?:boolean): BehaviorSubject<boolean> {
    if(this.userIsAdmin.getValue() === false || force === true)
      this.user_can("USER_IS_ADMIN").subscribe(
        data => this.userIsAdmin.next(data.data)
      );

    return this.userIsAdmin;
  }

  public doLogin(pseudo: string, password: string): Observable<any> {
    return this.api.post("../../Forum/ucp.php?mode=login", { username: pseudo, password: password, autologin: 'on', login: "Connexion" }, false).map(
      data => true
    ).catch(
      // The ucp is returning html so catch it and return true for completion to be checked.
      err => Observable.of(true)
      );
  }

}
